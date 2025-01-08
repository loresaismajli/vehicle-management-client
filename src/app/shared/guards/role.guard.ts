import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { AlertsService } from '../services/helpers/alerts.service';
import { environment } from '../../../environments/environment.development';
import { UserStorageService } from '../services/user-storage.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const userStorageService: UserStorageService = inject(UserStorageService);
  const { allowedRoles } = route.data;
  const userRole = userStorageService.getCurrentJwtInfo()?.role;

  const match = doesRoleMatch(allowedRoles, userRole);
  if (!match) showNoAccessAlert();
  return match;
};

const doesRoleMatch = (allowedRoles: string[], userRole?: string): boolean => {
  return allowedRoles.includes(userRole);
};

const showNoAccessAlert = () => {
  const alertsService: AlertsService = inject(AlertsService);
  alertsService.showErrorAlert(environment.errors.messages.unauthorizedAccess);
};
