import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const adminRoutes: Routes = [
  { path: '', redirectTo: 'fotos', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/admin-login').then(m => m.AdminLogin) },
  {
    path: 'fotos',
    loadComponent: () => import('./pages/fotos/admin-fotos').then(m => m.AdminFotos),
    canActivate: [authGuard],
  },
  {
    path: 'videos',
    loadComponent: () => import('./pages/videos/admin-videos').then(m => m.AdminVideos),
    canActivate: [authGuard],
  },
  {
    path: 'design',
    loadComponent: () => import('./pages/design/admin-design').then(m => m.AdminDesign),
    canActivate: [authGuard],
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/admin-sobre').then(m => m.AdminSobre),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'fotos' },
];
