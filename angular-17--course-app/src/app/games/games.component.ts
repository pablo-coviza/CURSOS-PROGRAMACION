import { Component } from '@angular/core';

@Component({
  selector: 'app-games',
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {

  games = [
    {
      id: 1,
      name: "Uncharted"
    },
    {
      id: 2,
      name: "Gran Turismo"
    },
    {
      id: 3,
      name: "Final Fantasy VII"
    }
  ]

}
