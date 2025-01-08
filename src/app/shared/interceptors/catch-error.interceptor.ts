import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { StorageService } from '../services/helpers/storage.service';
import { environment } from '../../../environments/environment.development';
import { UserStorageService } from '../services/user-storage.service';

@Injectable({ providedIn: 'root' })
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private userStorageService: UserStorageService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((e) => this.onCatchError(e)));
  }

  private onCatchError(error: HttpErrorResponse) {
    const { status } = error;
    const { unauthorize, cors } = environment.errors.statuses;
    if (status == unauthorize || status == cors) this.onUnauthorizedToken();

    // throw only error message
    return throwError(
      () => error?.error?.message ?? environment.errors.messages.general
    );
  }

  private onUnauthorizedToken(): void {
    this.clearUserInfoFromStorage();
    this.navigateToLoginPage();
  }

  private clearUserInfoFromStorage(): void {
    this.userStorageService.clearCurrentJwtInfo();
    this.storageService.clear();
  }

  private navigateToLoginPage(): void {
    this.router.navigate(['/schedule']);
  }
}
