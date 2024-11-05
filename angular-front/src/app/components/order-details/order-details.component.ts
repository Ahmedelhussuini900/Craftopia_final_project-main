import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';  // Adjust the path as needed
import { OrderDetails } from '../../order_items';  // Adjust the path based on your structure
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-details',
  standalone:true,
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  imports: [
    CommonModule,  
   
  ],
})
export class OrderDetailsComponent implements OnInit {
  order: OrderDetails | null = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.getOrderDetails(orderId);
    }
  }

  getOrderDetails(id: string): void {
    this.orderService.getOrder(id).subscribe(
      (order) => {
        this.order = order;
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  calculateTotalPrice(orderItems: any[] | undefined): number {
    if (!orderItems) {
      return 0;
    }
    return orderItems.reduce((total, item) => {
      console.log(`Calculating: ${item.quantity} * ${item.product.price}`); 
      return total + (item.quantity * item.product.price); // Fixed typo here, "products" -> "product"
    }, 0);
  }
}