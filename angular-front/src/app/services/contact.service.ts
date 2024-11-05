import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = environment.apiUrl+'/contact-messages';

    constructor(private http: HttpClient) { }
    
    // Route::post('/payment/handel', [PaymentController::class, 'handlePayment'])->middleware('auth:sanctum');
    // Route::get('/payment/cancel', [PaymentController::class, 'cancel'])->name('cancel');
    // Route::get('/payment/success', [PaymentController::class, 'success'])->name('success');


    setMessage(data:any): Observable<any> {
        
        return this.http.post(`${this.apiUrl}`, data);
    }

    

    deleteMessage(id:string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.delete(`${this.apiUrl}/${id}`,{ headers });
  }
    getAllMessage(): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}`,{ headers });
    }

}