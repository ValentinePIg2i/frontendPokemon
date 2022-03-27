import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  idPokemon?: number;
  team ?: number;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(id:number){
    this.idPokemon=id;

  }

  onClick(){
    this.team=1;
  }

  onRetour(){
    this.idPokemon=undefined;
    this.team=undefined;
  }

}
