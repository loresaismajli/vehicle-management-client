import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtInfo } from '../../models/jwt-info.model';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  isTokenExpired(accessToken: string): boolean {
    if (!accessToken) return true;
    const data = jwtDecode(accessToken) as any;
    const { exp } = data;
    const expired: boolean = Date.now() >= exp * 1000;
    return expired;
  }

  decode(accessToken: string): JwtInfo {
    const data = jwtDecode(accessToken) as any;
    const { userId, username, firstName, lastName, roleId, role, exp } = data;
    const info: JwtInfo = {
      accessToken,
      userId,
      username,
      firstName,
      lastName,
      roleId,
      role,
      exp,
    };
    return info;
  }
}
