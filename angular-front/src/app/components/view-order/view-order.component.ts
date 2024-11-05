import { Component } from '@angular/core';
import { CustomerHeaderComponent } from "../customer-header/customer-header.component";
import { RouterModule,Router } from '@angular/router';
import { ListPartComponent } from '../customer-profile/list-part/list-part.component';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { OrderItemService } from '../../services/order-item.service';
import { ProductService } from '../../services/product.service';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [CommonModule,
            CustomerHeaderComponent,
            ListPartComponent,
            RouterModule],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent {
 
order:any;
totalPrice: number = 0;
totalPriceAfterOffers: number = 0;
totalOffers: number = 0;
orderItems:OrderItem [] = [];
  constructor(private orderService:OrderService,
    private router:Router,
    private orderItemService:OrderItemService,
    private productService:ProductService,
    private sellerService:SellerService
  ){}


  ngOnInit(): void {
    this.updateOrder();
}

updateOrder(){
  if(this.orderService.getCurrentOrder()){
    this.order =this.orderService.getCurrentOrder();
    this.updateOrderItems();
  }else{
    this.router.navigate(['/order']);
  }
}

viewProduct(product:any){

  this.productService.setProduct(product);
  this.router.navigate(['/product/view']);
}

delivered(item:any){
  this.orderItemService.deliverOrder(item.id).subscribe(
    response=>{
    alert('marked as recived successfully and money transferd to seller');
    this.updateOrderItems();
    },error=>{
      alert('an error happend');
      console.log('error happend',error);
    }
  );
}

viewSeller(item:any){
this.sellerService.getSellerById(item.id).subscribe(
  response=>{
this.sellerService.setCurrentSeller(response.data);
this.router.navigate(['/seller/contact']);

  },error=>{
console.log('error happend::',error)
  }
);
}

updateOrderItems(){
  this.orderItemService.getAllOrderItems(this.order.id).subscribe(
    response=>{
      this.orderItems = response.data;
      if(this.orderItems.length<1){
        alert('no order items in this order');
        this.router.navigate(['/order']);

      }
      console.log(this.orderItems);

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

        this.totalPrice += (item.product.price) * item.quantity;
        this.totalPriceAfterOffers += (item.product.priceAfterOffers) * item.quantity;
        this.totalOffers += (item.product.price - item.product.priceAfterOffers) * item.quantity;


      });

    },error=>{
      if(error.status === 404){
        this.router.navigate(['/order']);
      }
      console.log("error",error);

    }
  );
}
delete(item:any){
  this.orderItemService.deleteOrderItem(item.id).subscribe(
    response=>{
      alert('deleted successfully');
      this.updateOrderItems();
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

}