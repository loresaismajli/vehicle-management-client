import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

import { StorageService } from '../services/helpers/storage.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken: string = this.storageService.get(
      environment.keys.accessToken
    );

    return accessToken
      ? this.onAuthorizedRequest(req, next, accessToken)
      : this.onAnonymousRequest(req, next);
  }

  private onAnonymousRequest(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req);
  }

  private onAuthorizedRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    accessToken: string
  ) {
    const modifiedReq = this.addAuthorizationInRequest(req, accessToken);
    return next.handle(modifiedReq);
  }

  //#region authorize request helpers
  private addAuthorizationInRequest(
    req: HttpRequest<any>,
    accessToken: string
  ) {
    const name: string = environment.keys.authorization;
    const value: string = `Bearer ${accessToken}`;

    return req.clone({
      headers: req.headers.set(name, value),
    });
  }
  //#endregion authorize request helpers
}
