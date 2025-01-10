import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './helpers/http.service';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
    constructor(private http: HttpService) { }

    getVehicles(): Observable<any[]> {
        const path: string = 'vehicles';
        return this.http.get<any[]>({ path });
    }

    getVehicleById(id: number): Observable<any> {
        const path: string = `vehicles/details/${id}`;
        return this.http.get<any>({ path });
    }

    createVehicle(vehicle: any): Observable<any> {
        const path: string = 'vehicles';
        return this.http.post<any>({ path, body: vehicle });
    }
}