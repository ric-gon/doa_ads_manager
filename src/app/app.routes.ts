import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FbLoginComponent } from './fb-login/fb-login.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent, title: 'DOA - Home Page'},
  {path: 'fb', component: FbLoginComponent, title: 'Facebook - Login'},
];
