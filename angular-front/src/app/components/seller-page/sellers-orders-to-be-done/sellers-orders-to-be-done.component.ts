import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { OrderItemService } from '../../../services/order-item.service';
import { ProductService } from '../../../services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sellers-orders-to-be-done',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './sellers-orders-to-be-done.component.html',
  styleUrl: './sellers-orders-to-be-done.component.css'
})
export class SellersOrdersToBeDoneComponent {
  orderItems:OrderItem [] = [];
  page: number = 1;              
  itemsPerPage: number = 20; 
  filteredProducts: any[] = [];
  priceFrom: number  = 0;
  priceTo: number = 0;
  searchTerm: string = '';
  searchCriteria: string = 'name'; 
  constructor(private orderService:OrderService,
    private orderItemService:OrderItemService,
    private productService:ProductService
  ){}

  ngOnInit(): void {
    this.updateOrderItems();
}
search() {
  this.filteredProducts = this.orderItems;

  if (this.searchCriteria === 'name' && this.searchTerm) {
      this.filteredProducts = this.filteredProducts.filter(product =>
          product.product.product_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  } else if (this.searchCriteria === 'category' && this.searchTerm) {
      this.filteredProducts = this.filteredProducts.filter(product =>
          product.product.category.category_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  } else if (this.searchCriteria === 'price') {
      if (this.priceFrom <= this.priceTo ) {
          this.filteredProducts = this.filteredProducts.filter(product =>
            product.product.priceAfterOffers !== null && 
            product.product.priceAfterOffers >= this.priceFrom && 
            product.product.priceAfterOffers <= this.priceTo
          );
      }else{
        alert('the from price must be less than the to price');
      }
  }

  this.page = 1; 
}


done(item:any){
  this.orderItemService.doneOrder(item.id).subscribe(
    response=>{
      alert('added to your accepted done list');
      this.updateOrderItems();
    },error=>{
      console.log('error happend', error)
      alert('there is an error happend');
  
    }
  );
}
updateOrderItems(){
  this.orderItemService.getAllMyDoingOrderItems().subscribe(
    response=>{
      this.orderItems = response.data;
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


      });
      this.filteredProducts = this.orderItems;

    },error=>{
      if(error.status === 404){
      }
      console.log("error",error);

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