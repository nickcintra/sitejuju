import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'portfolio', redirectTo: 'portfolio/fotos', pathMatch: 'full' },
  { path: 'portfolio/:tipo', loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.Portfolio) },
  { path: 'sobre', loadComponent: () => import('./pages/sobre/sobre').then(m => m.Sobre) },
  {
    path: 'admin',
    loadComponent: () => import('./admin/layout/admin-layout').then(m => m.AdminLayout),
    children: [
      { path: '', redirectTo: 'fotos', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./admin/pages/login/admin-login').then(m => m.AdminLogin) },
      {
        path: 'fotos',
        loadComponent: () => import('./admin/pages/fotos/admin-fotos').then(m => m.AdminFotos),
        canActivate: [authGuard],
      },
      {
        path: 'videos',
        loadComponent: () => import('./admin/pages/videos/admin-videos').then(m => m.AdminVideos),
        canActivate: [authGuard],
      },
      {
        path: 'design',
        loadComponent: () => import('./admin/pages/design/admin-design').then(m => m.AdminDesign),
        canActivate: [authGuard],
      },
      {
        path: 'sobre',
        loadComponent: () => import('./admin/pages/sobre/admin-sobre').then(m => m.AdminSobre),
        canActivate: [authGuard],
      },
      { path: '**', redirectTo: 'fotos' },
    ],
  },
  { path: '**', redirectTo: '' },
];
