import { Component, OnInit } from '@angular/core';
import { sprintf } from "sprintf-js";
import { PokemonModel } from 'src/app/models/pokemon.model';
import { AppService, GetPokemonDetailsResponse, GetPokemonListPayload, GetPokemonListResponse } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = "Pokemon";
  pokemonListOriginals: any[];

  pokemonList: any[];
  pagination;
  lightTheme;
  filter;

  constructor(private appService: AppService) {
    this.pokemonListOriginals = [];
    this.pokemonList = [];
    this.pagination = {
      offset: 0,
      limit: 20,
      count: 0,
    };
    this.lightTheme = false;
    this.filter = "";
  }

  ngOnInit(): void {
    this.loadPokemonList();
  }


  async loadPokemonList() {
    const urls = await this.loadPokemonListInfo();
    await this.loadPokemonListDetails(urls);


  }

  async loadPokemonListInfo() {
    const params: GetPokemonListPayload = {
      offset: this.pagination.offset,
      limit: this.pagination.limit
    }
    const response: GetPokemonListResponse = await this.appService.getPokemonList(params);

    this.pagination.count = response.count;
    return response.results;
  }

  async loadPokemonListDetails(urls) {
    const urlImage = "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/%s.png?raw=true";
    urls.forEach(async item => {
      const result: GetPokemonDetailsResponse = await this.appService.getPokemonDetails(item.url);
      let pokemon = new PokemonModel();
      pokemon.id = result.id;
      pokemon.name = result.name;
      pokemon.sprites = result.sprites;
      pokemon.url = item;
      pokemon.imageUrl = sprintf(urlImage, pokemon.id);

      this.pokemonListOriginals.push(pokemon);
      this.search();
    })
  }

  toggleTheme() {
    this.lightTheme = !this.lightTheme;
    document.body.classList.toggle('light');
  }


  onScroll() {
    this.pagination.offset += this.pagination.limit;
    this.loadPokemonList();
  }

  search() {
    if (!this.filter || this.filter.length > 3) {
      this.pokemonList = this.pokemonListOriginals.filter(item => item.name.includes(this.filter));
    }
  }

}
