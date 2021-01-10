import { Component, Input, OnInit } from '@angular/core';
import { PokemonModel } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  @Input() pokemon: PokemonModel;

  constructor() {
    this.pokemon = new PokemonModel();
  }

  ngOnInit(): void {
  }

}
