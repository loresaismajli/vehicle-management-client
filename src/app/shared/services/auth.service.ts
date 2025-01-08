import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './helpers/http.service';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  login(login: Login): Observable<string> {
    const path: string = 'auth/login';
    return this.http.post<string>({ path, body: login });
  }
}
