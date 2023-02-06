import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeComponent } from './tic-tac-toe.component';

describe('TicTacToeComponent', () => {
  let component: TicTacToeComponent;
  let fixture: ComponentFixture<TicTacToeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicTacToeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update cell value when makeMove is called', () => {
    component.makeMove(component.board[0][0]);
    expect(component.board[0][0]).toEqual(component.currentPlayer);
  });

  it('should reset the game state when reset method is called', () => {
    component.makeMove(component.board[0][0]);
    component.reset();
    expect(component.board).toEqual([        
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    expect(component.currentPlayer).toEqual('X');
  });


});
