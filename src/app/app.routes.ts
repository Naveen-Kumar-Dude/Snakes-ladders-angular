import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GamePageComponent } from './game-page/game-page.component';


export const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'game',
        component: GamePageComponent
      },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
      }
];
