import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from "./user/user.component";
import { GamesComponent } from "./games/games.component";
import { CommentsComponent } from "./comments/comments.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserComponent, UserComponent, GamesComponent, CommentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // city = 'Valencia';
}
