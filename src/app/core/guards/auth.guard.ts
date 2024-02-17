import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { IJwtToken } from '../../data/authentication-datasource/models/jwt-token.model';

export const authGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const routerService = inject(Router);
  const jwt: IJwtToken = storageService.getSessionItem("jwt");

  if (!jwt) {
    return routerService.createUrlTree(['authentication']);
  }

  return true;

};
