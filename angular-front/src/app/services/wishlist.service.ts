import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private apiUrl = environment.apiUrl+'/wish_lists';


    constructor(private http: HttpClient) { }


    addItem(data:any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
    
      return this.http.post(`${this.apiUrl}`, data, { headers });
    }


    isInMyWishlist(data:any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
    
      return this.http.post(`${this.apiUrl}/myWish`, data, { headers });
    }
    



    // Route::post('wish_lists/remove/{product_id}', [WishListController::class , 'removeWishlist'])->middleware('auth:sanctum');

    deleteWishlistItem(id:string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
    
      return this.http.delete(`${this.apiUrl}/remove/${id}` , { headers });
    }
}



