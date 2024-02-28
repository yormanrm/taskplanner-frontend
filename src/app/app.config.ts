import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { setAuthorizationHeadersInterceptor } from './core/interceptors/set-authorization-headers.interceptor';
import { expirationTokenInterceptor } from './core/interceptors/expiration-token.interceptor';
import { provideAngularSvgIcon } from 'angular-svg-icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([setAuthorizationHeadersInterceptor, expirationTokenInterceptor])
    ),
    provideAngularSvgIcon()
  ]
};
