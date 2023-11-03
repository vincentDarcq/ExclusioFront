import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { genresSimples, genresAvances } from '../models/genres';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css']
})
export class CheckboxesComponent implements OnInit, OnChanges {

  @Input() itemFound;
  @Input() itemInput;
  @Input() itemsSelectedFromMain
  items: Array<any> = new Array();
  itemSelected: Array<string> = new Array();
  keysItems: Array<string>;
  @Input() categorie: string;

  constructor(
    private movieService: MoviesService
  ) {
    
  }

  ngOnInit(): void {
    switch(this.categorie){
      case "genres":
        this.fetchInfosForGenres();
        break;
      case "genresA":
      case "acteurs":
      case "realisateurs":
    }
  }

  fetchInfosForGenres(){
    Object.keys(genresSimples).forEach(key => {
      this.items.push(genresSimples[key]);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  selected(selected: string) {
    switch(this.categorie){
      case "genres":
        const index = this.items.findIndex(i => i === selected);
        this.items.splice(index, 1);
        this.itemSelected.push(selected);
        const genreToAdd = Object.keys(genresSimples).find(key => genresSimples[key] === selected);
        this.movieService.addGenreSelectedS(genreToAdd);
        break;
      case "genresA":
      case "acteurs":
      case "realisateurs":
    }
  }

  restored(restored: string) {
    switch(this.categorie){
      case "genres":
        const index = this.itemSelected.findIndex(i => i === restored);
        this.itemSelected.splice(index, 1);
        this.items.push(restored);
        const genreToRemove = Object.keys(genresSimples).find(key => genresSimples[key] === restored);
        this.movieService.removeGenreSelectedS(genreToRemove);
        break;
      case "genresA":
      case "acteurs":
      case "realisateurs":
    }
  }

  showItemsExclus() {
    document.getElementById("itemsExclus").style.display = "block";
  }

  hideItemsExclus() {
    document.getElementById("itemsExclus").style.display = "none";
  }

}
