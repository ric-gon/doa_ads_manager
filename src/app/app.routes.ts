import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FbLoginComponent } from './components/fb-login/fb-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', 
    component: HomeComponent, 
    title: 'DOA - Home Page',
  },
  {
    path: 'facebook', 
    component: FbLoginComponent, 
    title: 'Facebook - Login'
  },
  {
    path: 'dashboard', 
    component: DashboardComponent, 
    title: 'Dashboard - Facebook account'
  },
  {
    path: '**', 
    component: NotFoundComponent, 
    title: '404 - Page Not Found'
  },
];
