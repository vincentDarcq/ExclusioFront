import { Component, ViewEncapsulation, OnInit, DoCheck } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { User } from '../models/user';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note';
import { Subscription } from 'rxjs';
import { genresSimples, genresAvances } from '../models/genres';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, DoCheck {

  movies: Array<Movie> = [];
  bestMovie: Movie;
  bestAlloGrades: Array<Movie> = [];
  sub: Subscription;
  oldBestAlloGrades: Array<Movie> = [];
  movieSearched: Array<Movie> = [];
  genres: Array<string> = [];
  genresAvance: Array<string> = genresAvances;
  avances: Array<string> = [];
  realisateurs: Array<string> = [];
  tenReals: Array<string> = [];
  tenActors: Array<string> = [];
  actors: Array<string> = [];
  genresSelectedS: Array<string> = [];
  genresSelectedA: Array<string> = [];
  realisateursSelected: Array<string> = [];
  actorsSelected: Array<string> = [];
  currentUser: User;
  notes: Array<Note> = [];
  exclusion: boolean = true;
  displayGenres: boolean = true;
  displayGenresAvance: boolean = false;
  displayRealisateurs: boolean = false;
  displayActeurs: boolean = false;
  genreFound: boolean = false;
  realFound: boolean = false;
  actorFound: boolean = false;
  genreInput: string;
  realInput: string;
  actorInput: string;
  searching: boolean = false;

  constructor(
    private movieService: MoviesService,
    //private noteService: NotesService
  ) {
    genresAvances.forEach(genre => this.genres.push(genre));
  }

  async ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.movies = (await this.movieService.getMoviesPage(0)).content;
    this.bestMovie = await this.movieService.getBestAlloMovie();
    this.actors = this.movieService.getActors();
    this.realisateurs = this.movieService.getRealisateurs();
    //this.notes = this.noteService.getNotes();
    // this.sub = this.movieService.getFirstAlloMovie().subscribe((movie: Movie) => {
    //   this.bestMovie = movie;
    //   this.unsubscribe();
    // })
    // this.sub = this.noteService.getBestAllocine().subscribe(list => {
    //   this.bestAlloGrades.push(...list);
    //   this.splitMoviesAllocine();
    //   this.searchFromSavedSelectedItems();
    //   this.unsubscribe();
    // });
    this.oldBestAlloGrades = this.bestAlloGrades;
    this.movieService.getSearch().subscribe(
      (search) => {
        this.movieSearch(search)
      });
  }

  private unsubscribe() {
    if (this.sub != undefined) {
      this.sub.unsubscribe();
    }
  }

  ngDoCheck(): void {
    if (this.realisateurs.length >= 1 && this.tenReals.length === 0) {
      for (let i = 0; i < this.realisateurs.length; i++) {
        this.realisateurs[i] = this.realisateurs[i].toLowerCase();
        if (this.tenReals.length < 10) {
          this.tenReals.push(this.realisateurs[i]);
        }
      }
    }
    if (this.actors.length >= 1 && this.tenActors.length === 0) {
      for (let i = 0; i < this.actors.length; i++) {
        this.actors[i] = this.actors[i].toLowerCase();
        if (this.tenActors.length < 10) {
          this.tenActors.push(this.actors[i]);
        }
      }
    }
  }

  movieSearch(search: string) {
    if (typeof search !== 'undefined' && search !== "") {
      this.movieSearched.splice(0, this.movieSearched.length)
      for (let movie of this.movies) {
        if (movie.titre.toLowerCase().indexOf(search) !== -1) {
          if (this.movieSearched.indexOf(movie) === -1) {
            this.movieSearched.push(movie);
            this.searching = true;
          }
        }
      }
    } else {
      this.searching = false;
    }
  }

  switchMode() {
    this.exclusion = !this.exclusion;
  }

  searched(searchValue: string) {
    this.genreFound = false;
    this.realFound = false;
    this.actorFound = false;
    if (this.genresAvance.indexOf(searchValue.toLowerCase()) !== -1) {
      this.genreFound = true;
      this.genreInput = this.movieService.getUpperForFirstLetter(searchValue);
    } else if (this.realisateurs.indexOf(searchValue.toLowerCase()) !== -1) {
      this.realFound = true;
      this.realInput = this.movieService.getUpperForFirstLetter(searchValue);
    } else if (this.actors.indexOf(searchValue.toLowerCase()) !== -1) {
      this.actorFound = true;
      this.actorInput = this.movieService.getUpperForFirstLetter(searchValue);
    }
  }

  pushListForCarroussel(array: Array<Movie>, index: number): void {
    for (let i = 0; i < 7; i++) {
      array.push(this.bestAlloGrades[index + i]);
    }
  }

  displayBoxes(type: string) {
    if (type === "genresSimples") {
      this.displayGenres = !this.displayGenres;
      this.displayGenresAvance = false;
      this.displayRealisateurs = false;
      this.displayActeurs = false;
    } else if (type === "genresAvances") {
      this.displayGenresAvance = !this.displayGenresAvance;
      this.displayGenres = false;
      this.displayRealisateurs = false;
      this.displayActeurs = false;
    } else if (type === "reals") {
      this.displayRealisateurs = !this.displayRealisateurs;
      this.displayGenres = false;
      this.displayGenresAvance = false;
      this.displayActeurs = false;
    } else if (type === "acteurs") {
      this.displayActeurs = !this.displayActeurs;
      this.displayGenres = false;
      this.displayGenresAvance = false;
      this.displayRealisateurs = false;
    }
  }

}
