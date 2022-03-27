

  // public getPokemonDetail(){
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.pokemonService.getInfoPokemon(id).subscribe(
  //     data => {
  //       this.detail = data;
  //     }
  //   )
  // }

import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { PokemonService } from '../service/pokemon.service'
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../model/pokemon';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {

  @Input() pokeId ?:number;
  @Output() retour = new EventEmitter();

  detail ?: Pokemon;


  constructor(private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location) { }


  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.pokeId){
      this.onChange(this.pokeId);
    }
  }

  public onChange(id: any){
    this.pokemonService.getInfoPokemon(id).subscribe(
      data => {
        this.detail = data;
      }
    )
  }

  goBack(): void {
    this.retour.emit();
  }



}
 
