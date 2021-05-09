import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user"
import { Role } from "./role"
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService{
    private apiServerUrl=environment.apiBaseUrl;
    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    dataRoleChange: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);

    constructor(private http: HttpClient){}

    get data(): User[] {
        return this.dataChange.value;
    }

    get dataRole(): Role[]{
        return this.dataRoleChange.value;
    }

    public getUsers(): Observable<User[]>{
        return this.http.get<User[]>(`${this.apiServerUrl}/users/all`);
    }

    public addUser(user: User): Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}/api/auth/signup`, user);
    }

    public updateUser(user: User): Observable<User>{
        return this.http.put<User>(`${this.apiServerUrl}/users/update`, user);
    }

    public deleteUser(userId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${userId}`);
    }

    public findUser(userId: User): Observable<User>{
        return this.http.get<User>(`${this.apiServerUrl}/users/find/${userId}`);
    }

    public getRoles(): Observable<Role[]>{
        return this.http.get<Role[]>(`${this.apiServerUrl}/users/allRoles`);
    }

    public findRole(roleId: number): Observable<Role>{
        return this.http.get<Role>(`${this.apiServerUrl}/users/findRole/${roleId}`);
    }
}