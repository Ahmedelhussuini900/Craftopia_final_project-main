import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class OrderPaymentService {

  private apiUrl = environment.apiUrl;

    // private apiUrl = 'http://0.0.0.0:8000/api'; 

    constructor(private http: HttpClient) { }
    
    // Route::post('/payment/handel', [PaymentController::class, 'handlePayment'])->middleware('auth:sanctum');
    // Route::get('/payment/cancel', [PaymentController::class, 'cancel'])->name('cancel');
    // Route::get('/payment/success', [PaymentController::class, 'success'])->name('success');


    requestPayment(data:any): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.post(`${this.apiUrl}/payment/handel`, data,{ headers });
    }

}