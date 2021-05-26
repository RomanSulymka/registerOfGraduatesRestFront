import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Work } from "./work";
import { Graduated } from "../graduated/graduated";

@Injectable({providedIn: 'root'})
export class WorkService{
    private apiServerUrl=environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getWorks(): Observable<Work[]>{
        return this.http.get<Work[]>(`${this.apiServerUrl}/api/works/all`);
    }

    public addWork(graduatesId: number, work: Work): Observable<Work>{
        return this.http.post<Work>(`${this.apiServerUrl}/api/graduates/${graduatesId}/add`, work);
    }

    public updateWork(graduatesId: number, work: number, value: Work): Observable<Work>{
        return this.http.put<Work>(`${this.apiServerUrl}/api/graduates/${graduatesId}/works/${work}`, value);
    }

    public deleteWork(workId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/api/works/delete/${workId}`);
    }

    public findWork(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/api/graduates/{graduatesId}/delete/${id}`);
    }
}