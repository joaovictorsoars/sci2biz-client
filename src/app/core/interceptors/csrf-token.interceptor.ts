import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { catchError, switchMap, throwError } from 'rxjs';

const isHandlingToken = signal(false);

function setCsrfToken(req: HttpRequest<unknown>, token: string) {
  return req.clone({
    headers: req.headers.set('X-CSRFTOKEN', token),
  });
}

function handleForbidden(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  tokenExtractor: HttpXsrfTokenExtractor,
  authenticationService: AuthenticationService,
) {
  isHandlingToken.set(true);
  let token = tokenExtractor.getToken();

  if (!token) {
    return authenticationService.get_csrf().pipe(
      switchMap(() => {
        isHandlingToken.set(false);
        token = tokenExtractor.getToken() as string;
        return next(setCsrfToken(req, token));
      }),
      catchError((err) => {
        isHandlingToken.set(false);
        return throwError(() => err);
      }),
    );
  }

  isHandlingToken.set(false);
  return throwError(() => 'Nao foi possivel processar a requisicao');
}

export function csrfTokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const tokenExtractor = inject(HttpXsrfTokenExtractor);
  const authenticationService = inject(AuthenticationService);

  const csrfToken = tokenExtractor.getToken();

  if (csrfToken) {
    req = setCsrfToken(req, csrfToken);
  }

  return next(req).pipe(
    catchError((error) => {
      const isError = error instanceof HttpErrorResponse;
      const isForbidden = error.status === 403;

      if (isError && isForbidden && !isHandlingToken()) {
        handleForbidden(req, next, tokenExtractor, authenticationService);
      }

      return throwError(() => error);
    }),
  );
}
