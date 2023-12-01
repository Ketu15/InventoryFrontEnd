import { Injectable } from '@angular/core';
import { User } from '../Models/User.model';
import { LoginResponse } from '../Models/login-response.model';
import { Observable } from 'rxjs';
import { LoginModel } from '../Models/Login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7135/api/User';

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  // signIn(credentials: {username: string, password: string}): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/signin`, credentials);
  // }

  // private apiUrl = 'http://localhost:7009/api/User'; // Replace with your backend API URL

  // constructor(private http: HttpClient) {}

  // signUp(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.apiUrl}/signup`, user);
  // }

  signIn(credentials: { username: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signin`, credentials);
  }
  login(user: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, user);
  }

}
