import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graduated } from './graduated';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class GraduatedService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getGraduates(): Observable<Graduated[]>{
        return this.http.get<Graduated[]>(`${this.apiServerUrl}/graduates/all`);
    }

    public addGraduated(graduated: Graduated): Observable<Graduated>{
        return this.http.post<Graduated>(`${this.apiServerUrl}/graduates/add`, graduated);
    }

    public updateGraduated(graduated: Graduated): Observable<Graduated>{
        return this.http.put<Graduated>(`${this.apiServerUrl}/graduates/update`, graduated);
    }

    public deleteGraduated(graduatedId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/graduates/delete/${graduatedId}`);
    }

    public findGraduated(graduatedId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/graduates/find/${graduatedId}`);
    }

}