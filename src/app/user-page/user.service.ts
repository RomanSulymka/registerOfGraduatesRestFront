import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user"

@Injectable({providedIn: 'root'})
export class UserService{
    private apiServerUrl=environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getUsers(): Observable<User[]>{
        return this.http.get<User[]>(`${this.apiServerUrl}/users/all`);
    }

    public addUser(user: User): Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}/users/add`, user);
    }

    public updateUser(user: User): Observable<User>{
        return this.http.put<User>(`${this.apiServerUrl}/users/update`, user);
    }

    public deleteUser(userId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${userId}`);
    }

    public findUser(userId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/users/find/${userId}`);
    }
}