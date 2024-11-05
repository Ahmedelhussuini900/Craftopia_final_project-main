import { Component, OnInit } from '@angular/core';
import { OrderItemService } from '../../../services/order-item.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css'],
  imports: [CommonModule, RouterModule]
})
export class CustomerOrdersComponent implements OnInit {
  orderItems: OrderItem[] = [];

  constructor(private orderItemService: OrderItemService,
     private router: Router,
    private productService:ProductService) {}

  ngOnInit(): void {
    this.getOrderItmes();
  }

  getOrderItmes(): void {
    this.orderItemService.getOlddOrderItems().subscribe(
      (response) => {
        this.orderItems = response.data;
        this.orderItems.forEach(item => {
          item.product.priceAfterOffers = item.product.price;
          item.product.totalOffers = 0;
  
          item.product.addedOffers.forEach(offerAdded => {
            const endDate = new Date(offerAdded.offer.end_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
  
            if (endDate.getTime() >= today.getTime()) {
              item.product.totalOffers += offerAdded.offer.discount;
              item.product.priceAfterOffers -= Math.floor((offerAdded.offer.discount / 100) * item.product.price);
            }
  
          });
  
  
  
        });
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }


  
  

  delete(item:any){
    this.orderItemService.deleteOrderItem(item.id).subscribe(
      response=>{
        alert('deleted successfully');
        this.getOrderItmes();
      },error=>{
        if(error.status === 403){
          alert('this order item is payed can not delete a payed item');
        }else{
          alert('an error happend');
        }
        console.log('error happend:' , error);
      }
    );
  }
  show(product:any){

    this.productService.setProduct(product);
    this.router.navigate(['/product/view']);
  }
  
  }








interface Offer {
  id: number;
  discount: number;
  start_date: string;
  end_date: string;
}

interface AddedOffer {
  id: number;
  offer_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  offer: Offer;
}

interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  size: string;
  stock: number;
  material: string;
  cover_image: string;
  video: string | null;
  deleted_at: string | null;
  addedOffers: AddedOffer[];

  totalOffers: number;
  priceAfterOffers: number;

}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  status: string;
  created_at:string;
}