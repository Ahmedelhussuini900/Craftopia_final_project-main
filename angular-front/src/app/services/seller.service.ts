import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 



@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = environment.apiUrl+'/sellers';
 
    

    constructor(private http: HttpClient) {

     }


     private currentSeller: any;

     setCurrentSeller(seller: any) {
       this.currentSeller = seller;
 
     }
   
     getCurrentSelller() {
       return this.currentSeller;
     }
 

     getSeller(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
        
        return this.http.get(`${this.apiUrl}/get/me` , { headers } );
    }



    getAllSellers(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl, { headers });
    }

    


    getSellerById(id:string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl+'/seller/'+id, { headers });
    }
    
    getAllBannedSellers(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl+'/banned', { headers });
    }




    updateSelller(data:any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.post(this.apiUrl+'/update/seller',data, { headers });
    }
    

    banSeller(id: string): Observable<any> {


      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.get(`${this.apiUrl}/ban/${id}`, { headers });
    }
    deleteSeller(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
  
        return this.http.get(`${this.apiUrl}/${id}`, { headers });
      }

    unBanSeller(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
  
        return this.http.get(`${this.apiUrl}/unBan/${id}`, { headers });
      }


   
   
}



