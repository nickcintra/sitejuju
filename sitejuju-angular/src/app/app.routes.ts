import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'portfolio', redirectTo: 'portfolio/fotos', pathMatch: 'full' },
  { path: 'portfolio/:tipo', loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.Portfolio) },
  { path: 'sobre', loadComponent: () => import('./pages/sobre/sobre').then(m => m.Sobre) },
  { path: '**', redirectTo: '' }
];
