// services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
    private apiUrl = `${environment.apiUrl}/order-items`;

    constructor(private http: HttpClient) { }
    private currentOrderItem: any;

    setCurrentOrderItem(order: any) {
      this.currentOrderItem = order;

    }
  
    getCurrentOrderItem() {
      return this.currentOrderItem;
    }


    getOrderItem(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
    }

    
    getAllOrderItems(order_id:string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/my-items/${order_id}`, { headers });
    }

    getAllWaitingOrderItems(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(`${this.apiUrl}/admin-waiting-orderitems`, { headers });
  }

    
  getAllDoneOrderItems(): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get(`${this.apiUrl}/admin-done-orderitems`, { headers });
}


getAllDoingOrderItems(): Observable<any> {
  const authToken = sessionStorage.getItem('authToken');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });
  return this.http.get(`${this.apiUrl}/admin-doing-orderitems`, { headers });
}


    getAllMyOrderItems(): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/seller-orders`, { headers });
    }

    
    craftOrderItem(id:string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/craft-order/${id}`, { headers });
    }


    serveOrderItem(id:string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/serve-order/${id}`, { headers });
    }

    doneOrder(id:string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(`${this.apiUrl}/done-order/${id}`, { headers });
  }
  deliverOrder(id:string): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get(`${this.apiUrl}/deliver-order/${id}`, { headers });
} 



getOlddOrderItems(): Observable<any> {
  const authToken = sessionStorage.getItem('authToken');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });
  return this.http.get(`${this.apiUrl}/old-order-items`, { headers });
} 
getAllMyDoneOrderItems(): Observable<any> {
  const authToken = sessionStorage.getItem('authToken');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });
  return this.http.get(`${this.apiUrl}/done-order-seller`, { headers });
} 
    getAllMyDoingOrderItems(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(`${this.apiUrl}/doing-order`, { headers });
  }

    deleteOrderItem(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }

    addOrderItem(orderData: any): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });  
        return this.http.post(this.apiUrl, orderData, { headers });     
    }

    updateOrderItem(orderData: any, id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.patch(`${this.apiUrl}/${id}`, orderData, { headers });
    }


}
