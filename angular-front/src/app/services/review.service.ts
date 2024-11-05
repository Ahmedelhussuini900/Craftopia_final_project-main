import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
    // private apiUrl = 'http://0.0.0.0:8000/api/orders'; 
    private apiUrl = environment.apiUrl+'/reviews';


    constructor(private http: HttpClient) { }

    getReview(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/${id}`, { headers });
    }
    


    getAllReviews(id:string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(`${this.apiUrl}/product/`+id, { headers });
    }

    deleteReview(id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }


   
    addReview(reviewData: any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.post(this.apiUrl,reviewData, { headers });
    }

    updateReview(reviewData: any , id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.patch(`${this.apiUrl}/${id}`,reviewData, { headers });
    }

}



