import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl ='http://localhost:3000';
  private tokenKey ='auth-token'
  
  constructor(private http: HttpClient) { }

  login(username: string | undefined, password: string | undefined): Observable<any>{
     const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<any>(this.apiUrl + '/login', { username, password},{headers:httpOptions.headers});
  }

  setToken(token:string):void{
    localStorage.setItem(this.tokenKey, token);
  }

  getToken():string | null{
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn():boolean{
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
