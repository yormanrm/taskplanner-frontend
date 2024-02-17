import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const expirationTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        alert("Expired token");
        storageService.removeSessionItem('jwt');
        router.navigate(['authentication']);
      }
      return throwError(() => error);
    })
  )
};