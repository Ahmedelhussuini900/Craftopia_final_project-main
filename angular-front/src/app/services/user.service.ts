import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl+'/users';
    constructor(private http: HttpClient) { }
    
    private currecntUser: any;

    setUser(user: any) {
      this.currecntUser = user;
    }

    getCurrentUser() {
      return this.currecntUser;
    }


    register(userData: any): Observable<any> {
      return this.http.post(this.apiUrl+"/register", userData);
    }

    getUser(): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/me`, { headers });
    }


    updatePassword(data:any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.post(`${this.apiUrl}/update-password`,data, { headers });
  }



    login(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, userData);
    }

    logOut(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
    
      return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
    }

    resendVarification(tocken:string|null): Observable<any> {
      const authToken = tocken;
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
    
      return this.http.post(`${this.apiUrl}/email/resend`, {}, { headers });
    }

    
    resetSendEmail(userData: any): Observable<any> {
      return this.http.post(this.apiUrl+"/reset-password", userData);
    }
    resetPassword(userData: any): Observable<any> {
      return this.http.post(this.apiUrl+"/reset", userData);
    }

}



