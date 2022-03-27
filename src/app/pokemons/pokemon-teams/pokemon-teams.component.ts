import { Component, OnInit,OnChanges, Input, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { PagedData } from '../model/paged-data';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../service/pokemon.service';
import { catchError, EMPTY, forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-pokemon-teams',
  templateUrl: './pokemon-teams.component.html',
  styleUrls: ['./pokemon-teams.component.scss']
})
export class PokemonTeamsComponent implements OnInit {
  @Input() teams ?:number;
  @Output() retour = new EventEmitter();

  token ?: string;
  flag ?: number;
  listPokemons?: PagedData<Pokemon>;
  maTeam?: Pokemon[];
  message ?: string;



  constructor(private authService: AuthService,private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  goBack(): void {
    console.log("goBACK");
    this.retour.emit();
  }

  ngOnChanges(): void {
    if(this.teams){
      this.displayTeam(this.teams);
    }
  }

  public displayTeam(team : any){
    this.token = localStorage.getItem("token") as string;
    this.authService.getMaTeam(this.token).pipe(
      catchError((error : HttpErrorResponse) => {
        if(error.status == 401){
          this.authService.refresh(localStorage.getItem("refreshToken") as string);
        }return EMPTY;
      }),
      switchMap(data => {

        if(data){
          const pokemonObservable : Observable<Pokemon>[] = data!.map(id =>
            this.pokemonService.getInfoPokemon(id)
            );
            return forkJoin(pokemonObservable)
        }
        return of();
      }),
      tap(
        pokemon => {
          this.maTeam = pokemon
          console.log(this.maTeam)
        }
      )
    ).subscribe()

  }

  public addPokemon(poke:Pokemon){
    this.token = localStorage.getItem("token") as string;
    if(this.message){
      this.message=undefined;
    }
    console.log(this.maTeam);
    if(this.maTeam?.length == 6){
          this.message = "Team déjà composé de 6 pokémons";
        }
        else{
          this.maTeam?.push(poke);
          const pokemonIds = this.maTeam?.map(
            pokemon => pokemon.id
          )??[]
          this.authService.setMaTeam(pokemonIds,this.token as string).subscribe(
            pokemon => {
              pokemon = poke

            }
          )
        }
  }

  public suppPokemon(poke:Pokemon){
    this.token = localStorage.getItem("token") as string;
    if(this.message){
      this.message=undefined;
    }
    if(this.maTeam?.length == 0){
          this.message = "Team ne contient aucun pokémon";
        }
        else{
          const index = this.maTeam!.findIndex(pokemon =>
            pokemon.id=== poke.id)
          this.maTeam?.splice(index,1);
          const pokemonIds = this.maTeam?.map(
            pokemon => pokemon.id
          )??[]
          this.authService.setMaTeam(pokemonIds,this.token as string).subscribe(
            pokemon => {
              pokemon = poke

            }
          )
        }
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
        console.log(this.listPokemons)
      }
    )
  }

  public onScroll(){
    console.log("onScroll");
    return this.getPokemonOnScroll(this.listPokemons?.offset as number + this.listPokemons!.limit, this.listPokemons!.limit)
  }

}
