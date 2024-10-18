import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';

export const authenticatedGuard: CanActivateFn = (
  _: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  if (authenticationService.isLogged) {
    return true;
  }

  const { url } = state;

  authenticationService.eraseTokens();
  return router.createUrlTree(['/auth/login'], {
    queryParams: {
      next:
        url === '/' || url === undefined || url === null
          ? undefined
          : encodeURI(url),
    },
  });
};
