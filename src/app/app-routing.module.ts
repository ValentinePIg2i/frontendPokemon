import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './pokemons/authentification/authentification.component';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';

const routes: Routes = [
  //{path: 'pokemon/:id', component : PokemonDetailComponent},
  //{path: 'pokemon', component: PokemonListComponent},
  {path: 'pokemon/:id', component : PokedexComponent},
  {path: 'pokemon', component: PokedexComponent},
  {path: '',component: AuthentificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
