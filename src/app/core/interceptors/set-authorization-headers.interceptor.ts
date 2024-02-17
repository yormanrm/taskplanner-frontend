import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';
import { IJwtToken } from '../../data/authentication-datasource/models/jwt-token.model';

export const setAuthorizationHeadersInterceptor: HttpInterceptorFn = (req, next) => {

  const storageService = inject(StorageService);
  const jwt: IJwtToken = storageService.getSessionItem("jwt");

  const isTokenStored = jwt?.token;
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  if (isTokenStored && isApiUrl) {
    req = req.clone({
      headers: req.headers.set('Authorization', jwt.token)
    });
  }

  return next(req);

};
