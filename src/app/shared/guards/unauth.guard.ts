import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { StorageService } from '../services/helpers/storage.service';
import { environment } from '../../../environments/environment.development';

// don't let authorized users go to "/auth" route
export const unauthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const storageService: StorageService = inject(StorageService);

  // check if user is authorized
  const loggedIn: boolean = isUserLoggedIn(storageService);

  return loggedIn ? onUserIsAuthorized(router) : onUserIsUnauthorized();
};

const isUserLoggedIn = (storageService: StorageService) => {
  return !!storageService.get(environment.keys.accessToken);
};

const onUserIsAuthorized = (router: Router) => {
  return router.navigate(['']);
};

const onUserIsUnauthorized = () => {
  return true;
};
