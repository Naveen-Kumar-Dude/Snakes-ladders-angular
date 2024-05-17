import { Component } from '@angular/core';
import { GridComponent } from "./grid/grid.component";
import { DiceComponent } from "./dice/dice.component";

@Component({
    selector: 'app-game-page',
    standalone: true,
    templateUrl: './game-page.component.html',
    styleUrl: './game-page.component.scss',
    imports: [GridComponent, DiceComponent]
})
export class GamePageComponent {


  bgMusic = new Audio();
  diceValue: number = 0;
  buttonActions: {startGame: boolean, restartGame: boolean} = {startGame: false, restartGame: false};
  playerOnMove = false;

  ngOnInit() {
   //this.playAudio();
  }

  ngOnDestroy() {
    this.stopAudio();
  }

  receiveDiceValue(event: number) {
    this.diceValue = event;
  }

  receiveButtonActions(event: {startGame: boolean, restartGame: boolean}) {
    this.buttonActions = event;
  }

  receiveIfPlayerOnMoveOrNot(event: boolean) {
    this.playerOnMove = Boolean(event)
  }

  playAudio(){
    this.bgMusic.src = "../../assets/audio/Adventure_bgm.mp3";
    this.bgMusic.load();
    this.bgMusic.play();
  }

  stopAudio() {
    this.bgMusic.pause();
  }
}
