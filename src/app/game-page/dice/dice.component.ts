import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {

  @Output() sendDiceValue = new EventEmitter<number>();
  @Output() buttonActions = new EventEmitter<{startGame: boolean, restartGame: boolean}>();

  @Input() playerOnMove: any;

  diceValue = 0;
  isDiceRolled = false;
  gameStarted = false;

  constructor(private router: Router) {}

  backToHome() {
    this.router.navigate(['/home']);
  }

  rollDice() {
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    this.isDiceRolled = true;
    setTimeout(() => {
      this.isDiceRolled = false;
      this.sendDiceValue.emit(this.diceValue);
    }, 2000)
    
    
  }

  beginGame() {
    this.gameStarted = true;
    this.buttonActions.emit({startGame: true, restartGame: false});
  }

  restartGame() {
    this.gameStarted = false;
    this.diceValue = 0;
    this.buttonActions.emit({startGame: false, restartGame: true});
  }

 }
