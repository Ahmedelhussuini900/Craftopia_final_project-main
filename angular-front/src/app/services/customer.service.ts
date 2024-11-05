import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = environment.apiUrl+'/customers';
 
    

    constructor(private http: HttpClient) {

     }


     private currentCustomer: any;

     setCurrentCustomer(customer: any) {
       this.currentCustomer = customer;
 
     }
   
     getCurrentCustomer() {
       return this.currentCustomer;
     }

   
   
     getCustomer(): Observable<any> {
        
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
        return this.http.get(`${this.apiUrl}/me`,{headers});
    }


   
    getCustomerById(id:string): Observable<any> {
        
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
        return this.http.get(`${this.apiUrl}/customer/${id}`,{headers});
    }

    getAllCustomers(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl, { headers });
    }
    getAllBannedCustomers(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl+'/banned', { headers });
    }

    
    updateCustomer(data:any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.post(this.apiUrl+'/update/customer',data, { headers });
    }

    banCustomer(id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.get(`${this.apiUrl}/ban/${id}`, { headers });
    }
    deleteCustomer(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
  
        return this.http.get(`${this.apiUrl}/${id}`, { headers });
      }

    unBanCustomer(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
  
        return this.http.get(`${this.apiUrl}/unBan/${id}`, { headers });
      }


   
   
}



