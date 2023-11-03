import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.css'],
  animations: [
    trigger('slideAnimation', [
      state('visible', style({ transform: 'translateX(0)' })),
      state('hidden', style({ transform: 'translateX(-100%)', display: 'none' })),
      state('reappear', style({ transform: 'translateX(100%)' })),
      transition('visible => hidden', [
        animate('500ms', style({ transform: 'translateX(-100%)' }))
      ]),
      transition('hidden => reappear', [
        style({ transform: 'translateX(100%)', display: 'block' }),
        animate('500ms ease-in-out')
      ]),
      transition('reappear => visible', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class CarousselComponent implements OnInit, OnDestroy {

  @Input() page: number;
  @Input() firstMovie: Movie;
  movies: Array<Movie> = new Array();
  prevMovies: Array<Movie> = new Array();
  nextMovies: Array<Movie> = new Array();
  changed: boolean;
  item: Movie = new Movie();
  show: boolean = false;
  genresA: Array<string> = [];
  reals: Array<string> = [];
  actors: Array<string> = [];
  subscription: Subscription = new Subscription();
  finalPage: number;
  caroussel: Array<{movies: Array<Movie>, state: String}> = new Array();
  sectionState = 'visible';

  constructor(private moviesService: MoviesService) { }

  async ngOnInit(): Promise<void> {
    this.subscription.add(
      this.moviesService.getGenreSelectedS().subscribe(async genres => {
        if(genres.length > 0){
          this.movies = (await this.moviesService.getMoviesPageWithExclusions(
            this.page,
            genres,
            this.moviesService.getSelectedReals(),
            this.moviesService.getSelectedActors()
            )).content
        }
      })
    )
    this.movies = (await this.moviesService.getMoviesPage(this.page)).content;
    this.movies.shift();
    this.finalPage = this.moviesService.getFinalPage;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  showDetails(movie: Movie) {
    this.show = !this.show
    this.item = movie
  }

  hideDetails() {
    this.show = !this.show
    this.item = null
  }

  async prevSection() {
    if(this.page >= 3){
      this.toggleSection();
      this.page -= 3;
      this.movies = (await this.moviesService.getMoviesPage(this.page)).content;
      this.movies.shift();
      this.toggleSection();
      this.toggleSection();
    }
  }

  async nextSection() {
    this.toggleSection();
    this.page += 3;
    this.movies = (await this.moviesService.getMoviesPage(this.page)).content;
    this.movies.shift();
    this.toggleSection();
    this.toggleSection();
  }

  async toggleSection() {
    if (this.sectionState === 'visible') {
      this.sectionState = 'hidden';
    } else if (this.sectionState === 'hidden') {
      this.sectionState = 'reappear';
    } else {
      this.sectionState = 'visible';
    }
  }
}
