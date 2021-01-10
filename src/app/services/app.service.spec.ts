import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokemonModel } from '../models/pokemon.model';
import { AppService, GetPokemonDetailsResponse, GetPokemonListResponse, Info } from './app.service';

import { sprintf } from "sprintf-js";
describe('AppService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppService
      ]
    });
    service = TestBed.inject(AppService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });


  describe('#getPokemonList', () => {
    let expectedPokemonList: GetPokemonListResponse;
    let pokemonList: PokemonModel[];

    beforeEach(() => {
      //Dummy data to be returned by request.
      expectedPokemonList = {
        count: 1,
        next: "https://pokeapi.co/api/v2/pokemon",
        previous: null,
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
          }
        ]
      } as GetPokemonListResponse;
    });

    //Test case 1
    it('should return expected employees by calling once', () => {
      const params = {
        offset: 0,
        limit: 20
      }
      service.getPokemonList(params).then(
        result => {
          console.log(result);
          expect(result.count).toBeGreaterThanOrEqual(expectedPokemonList.count, 'should return count more than 1'),
            expect(result.next).toContain(expectedPokemonList.next, 'should return url expected'),
            expect(result.previous).toBe(expectedPokemonList.previous, 'should return null'),
            expect(result.results).toContain(expectedPokemonList.results[0], 'should at least the bulbasaur'),
            fail
        }
      );

      const req = httpTestingController.expectOne(service.getPokemonListURL.concat(sprintf("?offset=%s&limit=%s", params.offset, params.limit)));
      expect(req.request.method).toEqual('GET');

      req.flush(expectedPokemonList); //Return expectedEmps
    });


  });
  describe('#getPokemonDetails', () => {
    let expectedPokemonDetails: GetPokemonDetailsResponse;
    let pokemonList: PokemonModel[];

    beforeEach(() => {
      //Dummy data to be returned by request
      expectedPokemonDetails = {
        name: "bulbasaur",
        id: 1,
        sprites: {
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
        }
      } as GetPokemonDetailsResponse;
    });

    //Test case 1
    it('should return expected pokemon details by calling once', () => {
      const params = "https://pokeapi.co/api/v2/pokemon/1/"
      service.getPokemonDetails(params).then(
        result => {
          console.log(result);
          expect(result.name).toContain(expectedPokemonDetails.name, 'should return url expected'),
            expect(result.id).toEqual(expectedPokemonDetails.id, 'should return count more than 1'),
            expect(result.sprites.back_default).toEqual(expectedPokemonDetails.sprites.back_default, 'sprites back_default should be equal'),
            expect(result.sprites.front_default).toEqual(expectedPokemonDetails.sprites.front_default, 'sprites front_default should return null'),
            expect(result.sprites.back_shiny).toEqual(expectedPokemonDetails.sprites.back_shiny, ' sprites back_shiny should return null'),
            expect(result.sprites.front_shiny).toEqual(expectedPokemonDetails.sprites.front_shiny, ' sprites front_shiny should return null'),
            fail
        }
      );

      const req = httpTestingController.expectOne(params);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedPokemonDetails); //Return expectedEmps
    });

  });
});
