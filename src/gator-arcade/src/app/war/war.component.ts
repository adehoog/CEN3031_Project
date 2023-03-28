import { Component, NgModule } from '@angular/core';
import { PlayingCardsComponent } from '../playing-cards/playing-cards.component';

@Component({
  selector: 'app-war',
  templateUrl: './war.component.html',
  styleUrls: ['./war.component.scss']
})
export class WarComponent {
  cardCount_p1: number = 0;
  cardCount_p2: number = 0;
}
