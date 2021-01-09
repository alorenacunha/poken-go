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

  public getPokemonList(params: GetPokemonListPayload) {
    const url = "https://pokeapi.co/api/v2/pokemon";
    return this.http.get<GetPokemonListResponse>(
      url.concat(sprintf("?offset=%s&limit=%s", params.offset, params.limit))
    ).toPromise();
  }

  public getPokemonDetails(url) {
    return this.http.get<GetPokemonDetailsResponse>(
      url
    ).toPromise();
  }

  public getPokemonImage(id) {
    const url = "https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon";
    return this.http.get(
      url.concat(sprintf("/%s", id))
    ).toPromise();
  }
}

export interface GetPokemonListPayload {
  offset: Number;
  limit: Number;
}

export interface GetPokemonListResponse {
  count: Number;
  next: String;
  previous: String;
  results: Info[];
}

interface Info {
  name: String;
  url: String;
}

export interface GetPokemonDetailsResponse {
  base_experience: Number;
  name: String;
  id: Number;
  sprites: Sprites;
}

export interface Sprites {
  back_default: String;
  back_female: String;
  back_shiny: String;
  back_shiny_female: String;
  front_default: String;
  front_female: String;
  front_shiny: String;
  front_shiny_female: String;
}
