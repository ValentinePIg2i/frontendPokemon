import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { elementAt, iif } from 'rxjs';
import { PagedData } from '../model/paged-data';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() team = new EventEmitter();

  listPokemons?: PagedData<Pokemon>;
  search ?: string;
  token ?: string;


  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon(){
    this.pokemonService.getPokemons().subscribe(
        pokemon => {
          this.listPokemons = pokemon;
        })
  }

  public getPokemonOnScroll(offset: number,limit:number){

    this.pokemonService.getPokemonScroll(offset,limit).subscribe(
      pokemon => {
        this.listPokemons!.data = this.listPokemons!.data.concat(pokemon.data);
        this.listPokemons!.offset = pokemon.offset;

      }
    )
  }

  public onScroll(){
    return this.getPokemonOnScroll(this.listPokemons?.offset as number + this.listPokemons!.limit, this.listPokemons!.limit)
  }



  public selectPokemon(id : number){
    this.newItemEvent.emit(id);
  }

  public getPokemonSearch(search: any){
    if(search ==""){
      this.getPokemon();
    }else{
      this.pokemonService.getPokemonSearch(search).subscribe(
        pokemon => {
          this.listPokemons = pokemon;
        })
      }
    }

  public getTeam(){
    this.team.emit();
  }

}
