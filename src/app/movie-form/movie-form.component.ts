import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  newMovie: Movie;
  id: Number;

  constructor(private movieService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
    });
    if (this.id) {
      this.movieService.movies.subscribe(movies => {
        const id = movies.findIndex((movie) => this.id === movie.id);
        this.newMovie = movies[id];
      })
    } else {
      this.newMovie = new Movie();
    }
  }

  ngOnInit() {
  }

  validateForm() {
    if (this.id) {
      this.movieService.updateMovie(this.newMovie);
      this.router.navigate(['/movie', this.id]);
    } else {
      this.movieService.createMovie(this.newMovie);
      this.router.navigate(['']);
    }
  }
}
