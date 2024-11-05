// services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
// import { OrderDetails } from '../order_items'; // Adjust the import path based on your structure

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private apiUrl = `${environment.apiUrl}/orders`;

    constructor(private http: HttpClient) { }
    private currentOrder: any;

    setCurrentOrder(order: any) {
      this.currentOrder = order;

    }
  
    getCurrentOrder() {
      return this.currentOrder;
    }


    getOrder(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
    }

    getAllOrders(): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(this.apiUrl, { headers });
    }

    getMyOrders(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl+'/my-orders', { headers });
  }


    deleteOrder(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }

    addOrder(orderData: any): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });  
        return this.http.post(this.apiUrl, orderData, { headers });     
    }

    updateOrder(orderData: any, id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.patch(`${this.apiUrl}/${id}`, orderData, { headers });
    }

    cancelOrder(id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
      });
      return this.http.patch(`${this.apiUrl}/${id}`, { payment_status: 'canceled' }, { headers });
  }
}
