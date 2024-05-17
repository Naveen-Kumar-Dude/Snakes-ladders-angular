import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  @Input() diceValue: any;
  @Input() buttonActions: any;
  
  @Output() playerOnMoveSender = new EventEmitter<boolean>();
  

  matrix: any = [];
  maxRows = 6;
  maxColumns = 10;
  currentRow = this.maxRows - 1;
  nextRow = this.maxRows - 1;
  currentColumn = 0;
  nextColumn = 0;
  playerOnMove = false;

  constructor(private router: Router) {
    this.generateMatrix(this.maxRows, this.maxColumns);
   }

  ngOnChanges(changes: SimpleChange) {
    if (this.diceValue && (!this.buttonActions?.startGame && !this.buttonActions?.restartGame)) {
      this.calculateNextRowAndColumn(this.diceValue);
    }
    if (this.buttonActions?.startGame) {
      this.startGame();
    }
    if (this.buttonActions?.restartGame) {
      this.restartGame();
    }
  }

  sendPlayerOnMove() {
    this.playerOnMoveSender.emit(this.playerOnMove);
  }

  startGame() {
    this.playerOnMove = false;
    this.sendPlayerOnMove();
    this.matrix[this.maxRows -1][0].player = true;
    this.currentRow = this.nextRow = this.maxRows - 1;
    this.currentColumn = this.nextColumn = 0;
    this.buttonActions = {startGame: false, restartGame: false};
  }

  restartGame() {
    this.matrix[this.currentRow][this.currentColumn].player = false;
    this.buttonActions = {startGame: false, restartGame: false};
    this.startGame();
  }

  generateMatrix(rowLimit: number, colLimit: number) {
    let counter = 0;
    for (let r = 0; r < rowLimit; r++) {
      let row = []
      for (let c = 0; c < colLimit; c++) {
        row.push({label:counter, nature: this.assignNatureOfCell(r,c)})
        counter++
      }
      this.matrix.push(row);
    }
    this.matrix.reverse()
  }

  assignNatureOfCell(row: number, column: number) {
    if (row === 0 && column === 0) {
      return { type: 'start', shift: [] };
    } else if (row === this.maxRows - 1 && column === this.maxColumns - 1) {
      return { type: 'end', shift: [] };
    } else {
      return { type: '', shift: [] };
    }
    // if(row === 0 && column === 0) {
    //   return {type: 'start', shift:[]};
    // } else if (row === this.maxRows - 1 && column === this.maxColumns - 1) {
    //   return {type: 'end', shift:[]};
    // } else if((row === 4 && column === 4) || (row === 4 && column === 5)) {
    //   return {type: 'snake', shift:[]};
    // } else if ((row === 2 && column === 2) || (row === 0 && column === 1) || (row === 0 && column === 2) || (row === 0 && column === 3) || (row === 0 && column === 4)) {
    //   return {type: 'ladder', shift:[2,3]};
    // } else {
    //   return {type: '', shift:[]};;
    // }
  }

  calculateNextRowAndColumn(diceValue: number) {

    this.playerOnMove = true;
    this.sendPlayerOnMove();

    if(this.currentRow === 0 && this.currentColumn + diceValue > (this.maxColumns-1)) {
      return;
    }

    this.matrix[this.currentRow][this.currentColumn].player = false;

    if (this.currentColumn + diceValue > (this.maxColumns-1)) { // change row and column
      // this.currentRow -= 1;
      // this.currentColumn = diceValue - (this.maxColumns - this.currentColumn);
      this.nextRow -= 1;
      this.nextColumn = diceValue - (this.maxColumns - this.currentColumn);
    } else {  // change column
     // this.currentColumn = this.currentColumn + diceValue;
      this.nextColumn = this.currentColumn + diceValue;
    }
    if(this.currentRow === 0 && this.currentColumn === (this.maxColumns-1)) {
      console.log('@@@@You won@@@@@');
      this.restartGame(); 
      // TODO: show celebration
    }
    
    this.changePlayerPosition(this.currentRow, this.currentColumn);
  }

  changePlayerPosition(row: number, column: number) {
    if(this.matrix[row][column].nature.type === 'snake' || this.matrix[row][column].nature.type === 'ladder') {
      this.currentRow = this.matrix[row][column].nature.shift[0];
      this.currentColumn = this.matrix[row][column].nature.shift[1];
    }
    // move position grid by grid:
    this.movePlayerGridByGrid();
  }

  movePlayerGridByGrid() {

    setTimeout(() => {
      this.matrix[this.currentRow][this.currentColumn].player = false;
      this.playerOnMove = true;
      this.sendPlayerOnMove();
      if(this.currentColumn + this.diceValue > (this.maxColumns-1)) {
        if (this.currentColumn < this.nextColumn) {
          this.currentColumn += 1;
        } else {
          if (this.currentRow >= this.nextRow) {
            this.currentRow -= 1;
            this.currentColumn = 0;
          }
        }
      } else {
        if (this.currentColumn <= this.nextColumn) {
          this.currentColumn += 1;
        }
      }
      this.matrix[this.currentRow][this.currentColumn].player = true;
      if (this.currentColumn === this.nextColumn && this.currentRow === this.nextRow) {
        this.playerOnMove = false;
        this.sendPlayerOnMove();
        return;
      }
      this.movePlayerGridByGrid()
    }, 1000);
  }

}
