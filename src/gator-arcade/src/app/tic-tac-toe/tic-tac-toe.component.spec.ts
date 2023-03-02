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
    component.makeMove(0, 0, component.board[0][0]);
    expect(component.board[0][0]).toEqual('X');
  });

  it('should update the board with the current player marker when an empty cell is clicked', () => {
    component.currentPlayer = 'X';
    const x = 0;
    const y = 0;
    const cell = '';
    component.makeMove(x, y, cell);
    expect(component.board[x][y]).toEqual('X');
  });
  
  it('should not update the board when a non-empty cell is clicked', () => {
    component.currentPlayer = 'O';
    const x = 1;
    const y = 1;
    const cell = 'X';
    component.board[x][y] = cell;
    component.makeMove(x, y, cell);
    expect(component.board[x][y]).toEqual(cell);
  });
  
  it('should switch to the next player after a move is made', () => {
    component.currentPlayer = 'O';
    const x = 2;
    const y = 2;
    const cell = '';
    component.makeMove(x, y, cell);
    expect(component.currentPlayer).toEqual('X');
  });
  
  it('should emit a change event after a move is made', () => {
    spyOn(component.change, 'emit');
    const x = 1;
    const y = 2;
    const cell = '';
    component.makeMove(x, y, cell);
    expect(component.change.emit).toHaveBeenCalledWith(true);
  });

  it('should reset the game state when reset method is called', () => {
    component.makeMove(0, 0, component.board[0][0]);
    component.reset();
    expect(component.board).toEqual([        
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    expect(component.currentPlayer).toEqual('X');
  });


});
