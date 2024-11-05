import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderPaymentService } from '../../services/order-payment.service';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    imports: [CommonModule]  
})

export class OrderComponent implements OnInit {
    orders: any[] = [];

    constructor(private OrderPaymentService: OrderPaymentService ,private orderService: OrderService, private router: Router) { }

    ngOnInit(): void {
        this.fetchOrders();
    }

    fetchOrders(): void {
        this.orderService.getAllOrders().subscribe(
            (response) => {
                this.orders = response; 
            },
            (error) => {
                console.error('Error fetching orders:', error);
                if (error.status === 401) {
                    sessionStorage.removeItem('authToken');
                    sessionStorage.setItem('loginSession', 'true');
                    this.router.navigate(['/login']);
                    
                  } 
            }
        );
    }
    deleteOrder(order:any){
        this.orderService.deleteOrder(order.id).subscribe(
            (response) => {
                this.fetchOrders();
                alert('deleted successfully');
            },
            (error) => {
                alert('an error happened try again later');
                if (error.status === 401) {
                    sessionStorage.removeItem('authToken');
                    sessionStorage.setItem('loginSession', 'true');
                    this.router.navigate(['/login']);
                    
                  }else if(error.status === 403){
                      alert('can not delete a payed order');
          
                  }else{
          
                      alert('an erro happend try again later');
                  }            }
        );
    }

    payForOrder(order:any){

    const requestData = { 'id': order.id };
    this.OrderPaymentService.requestPayment(requestData).subscribe(
      response => {
        console.log(response);
        const url = response.url;
        window.open(url, '_blank');
      }
      , error => {
        if (error.status === 401) {
          sessionStorage.removeItem('authToken');
          sessionStorage.setItem('loginSession', 'true');
          this.router.navigate(['/login']);
        }else if(error.status === 403){
            alert('this order is already payed can not pay again');

        }else{

            alert('an erro happend try again later');
        }
      }
    )
  
    }

    viewOrder(order: any): void {
        this.orderService.setCurrentOrder(order);
        this.router.navigate(['/order/view']);
    }

    
    
    
}
