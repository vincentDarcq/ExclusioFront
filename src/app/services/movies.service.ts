import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Movie } from "../models/movie";
import { environment as ENV } from "../../environments/environment";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { genresSimples, genresAvances, GenresSimples } from '../models/genres';
import { PageResponseMovie } from "../models/pageResponseMovie";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  public movies: BehaviorSubject<Array<Movie>> = new BehaviorSubject(Array<Movie>());
  private _finalPage: number;
  private actors: Array<string>;
  private realisateurs: Array<string>;
  private wsUrl: string = ENV.apiUrl + "/movies";
  private search = new Subject<any>();
  private genreSelectedS: BehaviorSubject<Array<string>> = new BehaviorSubject(Array<string>());
  private genreSelectedA: BehaviorSubject<Array<string>> = new BehaviorSubject(Array<string>());
  private realsSelected: BehaviorSubject<Array<string>> = new BehaviorSubject(Array<string>());
  private actorsSelected: BehaviorSubject<Array<string>> = new BehaviorSubject(Array<string>());

  constructor(private httpClient: HttpClient) {
  }

  public addGenreSelectedS(genre: string){
    let arrayGenresS = this.genreSelectedS.value;
    arrayGenresS.push(genre);
    this.genreSelectedS.next(arrayGenresS);
  }

  public removeGenreSelectedS(genre: string){
    this.genreSelectedS.next(this.genreSelectedS.value.filter(g => g !== genre));
  }

  get getFinalPage(): number{
    return this._finalPage;
  }

  public getMoviesPage(page: number): Promise<PageResponseMovie>{
    return this.httpClient.get(`${this.wsUrl}/${page}`).pipe(
      tap((page: PageResponseMovie) => {
        this.movies.next(page.content);
        this._finalPage = page.totalPages - 1;
      })
    )
    .toPromise();
  }

  public getBestAlloMovie(): Promise<any> {
    return this.httpClient.get(`${this.wsUrl}/bestAlloMovie`).toPromise();
  }

  public getMoviesPageWithExclusions(
    page:number, 
    genres: Array<string>, 
    casting: Array<string>,
    realisateurs: Array<string>
    ): Promise<PageResponseMovie>{
    return this.httpClient.post(`${this.wsUrl}/exclusions/${page}`, {
      genres: genres,
      casting: casting,
      realisateurs: realisateurs
    }).pipe(
      tap((page: PageResponseMovie) => {
        this.movies.next(page.content);
        this._finalPage = page.totalPages - 1;
      })
    )
    .toPromise();
  }

  private getIndexMovie(id: Number): number {
    return this.movies.value.findIndex((movie) => movie.id === id);
  }

  public createMovie(movie: Movie) {
    let movies = this.movies.value;
    this.httpClient
      .post<Movie>(this.wsUrl, movie)
      .subscribe((movieFromJee) => {
        movies.push(
          new Movie(
            movieFromJee.titre,
            movieFromJee.synopsis,
            movieFromJee.genres,
            movieFromJee.casting,
            movieFromJee.realisateur,
            movieFromJee.covPortrait,
            movieFromJee.covPaysage,
            movie.time,
            movieFromJee.year,
            movieFromJee.pegi,
            movieFromJee.avertissement,
            movieFromJee.id
          )
        )
        this.movies.next(movies);
      });
  }

  public updateMovie(movie: Movie) {
    let movies = this.movies.value;
    this.httpClient
      .put<Movie>(this.wsUrl + `/${movie.id}`, movie)
      .subscribe((movieFromJee) => {
        const index = this.getIndexMovie(movie.id);
        if (index >= 0) {
          movies.splice(
            index,
            1,
            new Movie(
              movieFromJee.titre,
              movieFromJee.synopsis,
              movieFromJee.genres,
              movieFromJee.casting,
              movieFromJee.realisateur,
              movieFromJee.covPortrait,
              movieFromJee.covPaysage,
              movie.time,
              movieFromJee.year,
              movieFromJee.pegi,
              movieFromJee.avertissement,
              movieFromJee.id,
              movieFromJee.grade,
              movieFromJee.alloGrade,
              movieFromJee.imdbGrade
            )
          );
          this.movies.next(movies);
        }
      });
  }

  public getGenreSelectedS(): BehaviorSubject<Array<string>> {
    return this.genreSelectedS;
  }
  public getGenreSelectedA(): BehaviorSubject<Array<string>> {
    return this.genreSelectedA;
  }
  public getRealsSelected(): BehaviorSubject<Array<string>> {
    return this.realsSelected;
  }
  public getActorsSelected(): BehaviorSubject<Array<string>> {
    return this.actorsSelected;
  }

  public getRealisateurs(): Array<string> {
    this.realisateurs = new Array();
    this.httpClient
      .get(this.wsUrl + `/realisateurs`)
      .subscribe((list: Array<string>) => this.realisateurs.push(...list));
    return this.realisateurs;
  }

  public getActors(): Array<string> {
    this.actors = new Array();
    this.httpClient
      .get(this.wsUrl + `/acteurs`)
      .subscribe((list: Array<string>) => this.actors.push(...list));
    return this.actors;
  }

  // public getMoviesByGenre(genre: string): Observable<Array<Movie>> {
  //   return this.httpClient.get<Array<Movie>>(this.wsUrl + `/byGenre/${genre}`);
  // }

  getSelectedGenresS(): Array<string> {
    return this.genreSelectedS.value;
  }
  getSelectedGenresA(): Array<string> {
    return this.genreSelectedA.value;
  }
  getSelectedReals(): Array<string> {
    return this.realsSelected.value;
  }
  getSelectedActors(): Array<string> {
    return this.actorsSelected.value;
  }

  setSearch(search: string) {
    this.search.next(search);
  }

  getSearch(): Observable<any> {
    return this.search.asObservable();
  }

  getUpperForFirstLetter(type: string) {
    return type[0].toUpperCase() + type.substring(1);
  }
}
