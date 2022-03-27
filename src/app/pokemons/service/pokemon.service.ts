import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedData } from '../model/paged-data';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url='http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons'
  constructor(private http : HttpClient) { }

  getPokemons(): Observable<PagedData<Pokemon>>{
    const url = `${this.url}?offset=0&limit=20`;
    return this.http.get<PagedData<Pokemon>>(url);
  }

  getInfoPokemon(id: number): Observable<Pokemon>{
    const url = `${this.url}/${id}`;
    return this.http.get<Pokemon>(url);
  }

  getPokemonScroll(offset: number,limit: number): Observable<PagedData<Pokemon>>{
    const url = `${this.url}?offset=${offset}&limit=${limit}`;
    return this.http.get<PagedData<Pokemon>>(url);
  }

  getPokemonSearch(search: string) :Observable<PagedData<Pokemon>>{
    const url = `${this.url}?search=${search}`; 
    return this.http.get<PagedData<Pokemon>>(url);
  }
}
