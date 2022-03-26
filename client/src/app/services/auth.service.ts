import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:5000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }
  register(email: string, password: string, first_name: string, last_name: string): Observable<any> {
    let response =  this.http.post(AUTH_API + 'register', {
      email,
      password,
      first_name,
      last_name,
    }, httpOptions);
    
    return response
  }
  stats(): Observable<any> {
    return this.http.get(AUTH_API + 'stats', httpOptions);
  }
  boards(): Observable<any> {
    return this.http.get(AUTH_API + 'boards', httpOptions);
  }
  updateBoard(id: number, data: object): Observable<any> {
    return this.http.put(AUTH_API + `boards/${id}`, data, httpOptions);
  }
}