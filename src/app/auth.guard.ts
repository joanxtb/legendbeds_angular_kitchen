/*import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isLoggedIn(); // should return true/false or Observable<boolean>
};*/

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn(); // this could be a boolean or an observable

  /*if (typeof isLoggedIn === 'boolean') {
    if (!isLoggedIn) {
      router.navigate(['/']);
      return false;
    }
    return true;
  }*/

  // If isLoggedIn returns an Observable<boolean> (which it does now)
  return isLoggedIn.pipe(tap((loggedIn) => {
    if (!loggedIn) { router.navigate(['/login']); }
  }));
};
