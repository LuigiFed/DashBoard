import { Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { FlightsComponent } from './components/flights/flights.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { FlightsDetailsComponent } from './components/flights-details/flights-details.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddFlightsComponent } from './components/add-flights/add-flights.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MapComponent } from './components/map/map.component';




export const routes: Routes = [
  { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashBoardComponent,
    children: [
      {path: 'home', component: HomePageComponent},
      { path: 'map', component: MapComponent },
      { path: 'flights', component: FlightsComponent },
      { path: 'lastnews', component: LatestNewsComponent },
      { path: 'addflights', component: AddFlightsComponent },
      { path: 'flightsDetails', component: FlightsDetailsComponent },
      { path: 'logIn', component: LogInComponent},
      {path: 'signUp', component: SignUpComponent },

    ]
  },

  { path: '**', redirectTo: 'dashboard/home' }

];


