import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Work } from "./work"

@Injectable({providedIn: 'root'})
export class WorkService{
    private apiServerUrl=environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getWorks(): Observable<Work[]>{
        return this.http.get<Work[]>(`${this.apiServerUrl}/works/all`);
    }

    public addWork(work: Work): Observable<Work>{
        return this.http.post<Work>(`${this.apiServerUrl}/works/add`, work);
    }

    public updateWork(work: Work): Observable<Work>{
        return this.http.put<Work>(`${this.apiServerUrl}/works/update`, work);
    }

    public deleteWork(workId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/works/delete/${workId}`);
    }

    public findWork(workId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/works/find/${workId}`);
    }
}