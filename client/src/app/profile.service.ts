import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:3000';
  private tokenKey= 'auth-token'

  constructor(private http:HttpClient, private router:Router) { }

  getProfile(): Observable<any>{
    const token:any =localStorage.getItem(this.tokenKey)
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.http.get(this.apiUrl + '/profile',httpOptions).pipe(
      catchError(error=>{
        if(error.status === 401){
          localStorage.removeItem(this.tokenKey)
          this.router.navigate([''])
        }
        return throwError(error)
      })
    )
  }
}
