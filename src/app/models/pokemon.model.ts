import { Sprites } from '../services/app.service';

export class PokemonModel {
  constructor(
    public name: String = "",
    public url: String = null,
    public id: Number = null,
    public sprites: Sprites = null,
    public imageUrl: Sprites = null,
  ) { }
}
