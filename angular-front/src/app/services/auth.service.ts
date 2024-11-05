import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'/register';

  // private apiUrl = 'http://0.0.0.0:8000/api/register'; 

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
