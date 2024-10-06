import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const token = authService.getAuthToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: token
    }
  });

  return next(authReq).pipe(
    catchError((err) => {
      return authService.refreshToken().pipe(
        switchMap((res) => {
          // guardar nuevo token
          localStorage.setItem('access', res.access);
          console.log('token access refrescado y guardado')

          const newReq = req.clone({
            setHeaders: {
              Authorization: res.access
            }
          });

          return next(newReq);
        }),
        catchError((refreshError) => {
          const finalError = Error(refreshError);

          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          localStorage.removeItem('username');

          return throwError(() => finalError);
        })
      )
    })
  );
};
