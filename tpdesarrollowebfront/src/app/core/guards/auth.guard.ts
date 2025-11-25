import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // isAuthenticated() que revisa localStorage o una variable.
  if (authService.isAuthenticated()) {
    return true; // Si está autenticado, déjalo pasar
  }

  // Si no está autenticado, redirige al login
  router.navigate(['/auth/login']); // O la ruta que tengas para tu login
  return false; 
};
