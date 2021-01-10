import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { sprintf } from "sprintf-js";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private http: HttpClient
  ) { }

  getPokemonListURL = "https://pokeapi.co/api/v2/pokemon";
  public getPokemonList(params: GetPokemonListPayload) {
    return this.http.get<GetPokemonListResponse>(
      this.getPokemonListURL.concat(sprintf("?offset=%s&limit=%s", params.offset, params.limit))
    ).toPromise();
  }

  public getPokemonDetails(url) {
    return this.http.get<GetPokemonDetailsResponse>(
      url
    ).toPromise();
  }

  getPokemonImageURL = "https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon";
  public getPokemonImage(id) {
    return this.http.get(
      this.getPokemonImageURL.concat(sprintf("/%s", id))
    ).toPromise();
  }
}

export interface GetPokemonListPayload {
  offset: number;
  limit: number;
}

export interface GetPokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: Info[];
}

export interface Info {
  name: string;
  url: string;
}

export interface GetPokemonDetailsResponse {
  name: string;
  id: number;
  sprites: Sprites;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}
