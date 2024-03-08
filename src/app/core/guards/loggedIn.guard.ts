import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { IJwtToken } from '../../data/authentication-datasource/models/jwt-token.model';
import { StorageService } from '../services/storage.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const routerService = inject(Router);
  const jwt: IJwtToken = storageService.getSessionItem("jwt");

  if (jwt) {
    return routerService.createUrlTree(['/']);
  }
  return true;
};