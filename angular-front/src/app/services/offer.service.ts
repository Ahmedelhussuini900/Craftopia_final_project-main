import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 



@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = environment.apiUrl+'/offers';
 
    

    constructor(private http: HttpClient) {

     }

   
   

     private currentOffer: any;

     setCurrentOffer(offer: any) {
       this.currentOffer = offer;
 
     }
   
     getCurrentOffer() {
       return this.currentOffer;
     }


    getAllOffers(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl, { headers });
    }


    addOffer(offerData:any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.post(this.apiUrl,offerData, { headers });
    }
    addOfferToProducts(data:any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.post(this.apiUrl+'/add-offer-to-products',data, { headers });
    }
    

    removeProduct(data:any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.post(this.apiUrl+'/remove-product-from-offer',data, { headers });
    }

    getMyOffers(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl+"/getMyOffers", { headers });
    }


    deleteOffer(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
  
        return this.http.delete(`${this.apiUrl}/${id}`, { headers });
      }

       
   
}



