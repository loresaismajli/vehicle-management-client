import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { StorageService } from '../services/helpers/storage.service';
import { UserStorageService } from '../services/user-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  // check if user is authenticated
  const loggedIn: boolean = isUserLoggedIn();
  // execute method based on loggedIn boolean
  return loggedIn ? onUserIsAuthorized() : onUserIsUnauthorized();
};

const isUserLoggedIn = () => {
  const userStorageService: UserStorageService = inject(UserStorageService);
  userStorageService.ensureJwtIsLoaded();
  return !!userStorageService.getCurrentJwtInfo();
};

// let user access the route
const onUserIsAuthorized = () => {
  return true;
};

// clear data from state and redirect to login page
const onUserIsUnauthorized = () => {
  const router: Router = inject(Router);
  const storageService: StorageService = inject(StorageService);
  const userStorageService: UserStorageService = inject(UserStorageService);

  userStorageService.clearCurrentJwtInfo();
  storageService.clear();
  return router.navigateByUrl('/auth');
};
