import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './helpers/http.service';
import { Login } from '../models/login.model';

@Injectable({
    providedIn: 'root',
})
export class AccidentsService {
    constructor(private http: HttpService) { }

    getAccidents(): Observable<any[]> {
        const path: string = 'accident';
        return this.http.get<any[]>({ path });
    }

    getAccidentById(id: number): Observable<any> {
        const path: string = `accidents/details/${id}`;
        return this.http.get<any>({ path });
    }

    createAccident(accident: any): Observable<any> {
        const path: string = 'accidents';
        return this.http.post<any>({ path, body: accident });
    }

    getServices(): Observable<any[]> {
        const path: string = 'accidents/services';
        return this.http.get<any[]>({ path });
    }

    getServiceById(id: number): Observable<any> {
        const path: string = `accidents/services/details/${id}`;
        return this.http.get<any>({ path });
    }

    createService(accident: any): Observable<any> {
        const path: string = 'accidents/services';
        return this.http.post<any>({ path, body: accident });
    }
}
