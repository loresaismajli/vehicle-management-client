import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { StorageService } from './helpers/storage.service';
import { JwtService } from './helpers/jwt.service';
import { JwtInfo } from '../models/jwt-info.model';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  jwtInfo$ = new BehaviorSubject<JwtInfo | null>(null);

  constructor(
    private storageService: StorageService,
    private jwtService: JwtService
  ) {}

  getCurrentJwtInfo(): JwtInfo {
    return this.jwtInfo$.getValue();
  }

  setCurrentJwtInfo(jwtInfo: JwtInfo): void {
    this.jwtInfo$.next(jwtInfo);
  }

  clearCurrentJwtInfo(): void {
    this.jwtInfo$.next(null);
  }

  public ensureJwtIsLoaded(): void {
    if (this.jwtInfo$.value) {
      return;
    } else {
      const accessToken = this.getAccessTokenFromLocalStorage();
      if (!accessToken) return;
      const jwtInfo = this.decodeAccessToken(accessToken);
      if (!jwtInfo) return;
      this.jwtInfo$.next(jwtInfo);
    }
  }

  public setAccessTokenInAccessToken(accessToken: string): void {
    this.storageService.set(environment.keys.accessToken, accessToken);
  }

  private getAccessTokenFromLocalStorage(): string {
    const accessToken = this.storageService.get(environment.keys.accessToken);
    return accessToken;
  }

  private decodeAccessToken(accessToken: string): JwtInfo {
    const jwtInformation: JwtInfo = this.jwtService.decode(accessToken);
    return jwtInformation;
  }
}
