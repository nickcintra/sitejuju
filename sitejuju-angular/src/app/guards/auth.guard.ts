import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guard para rotas do admin. Verifica se há token JWT (ex.: no localStorage).
 * Quando a API estiver pronta: descomentar o bloco abaixo e remover o return true.
 */
export const authGuard: CanActivateFn = () => {
  // Temporariamente permite acesso para desenvolver sem API. Quando tiver login:
  // const router = inject(Router);
  // const token = typeof localStorage !== 'undefined' ? localStorage.getItem('sitejuju-token') : null;
  // if (token) return true;
  // router.navigate(['/admin/login']);
  // return false;
  return true;
};
