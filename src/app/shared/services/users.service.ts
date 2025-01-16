import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './helpers/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpService) { }

    getUsers(): Observable<any[]> {
        const path: string = 'users';
        return this.http.get<any[]>({ path });
    }

    getUserById(id: number): Observable<any> {
        const path: string = `users/details/${id}`;
        return this.http.get<any>({ path });
    }

    createUser(user: any): Observable<any> {
        debugger;
        const path: string = 'users';
        return this.http.post<any>({ path, body: user });
    }
}
