import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {

        // ✅ API errors handling
        if (error.status === 0) {
          console.error('Network error / server unreachable');
        }

        if (error.status === 401) {
          router.navigateByUrl('/login');
        }

        if (error.status === 403) {
          router.navigateByUrl('/access-denied');
        }

        if (error.status >= 500) {
          router.navigateByUrl('/server-error');
        }
         if (error.status === 404) {
          // router.navigateByUrl('/login');
        }
      }

      return throwError(() => error);
    })
  );
};
