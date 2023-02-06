import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckersComponent } from './checkers/checkers.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { ConnectFourComponent } from './connect-four/connect-four.component';
import { SolitaireComponent } from './solitaire/solitaire.component';
import { WarComponent } from './war/war.component';

const routes: Routes = [
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'checkers', component: CheckersComponent },
  { path: 'connect-four', component: ConnectFourComponent },
  { path: 'solitaire', component: SolitaireComponent },
  { path: 'war', component: WarComponent },
  { path: '', redirectTo: '/tic-tac-toe', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
