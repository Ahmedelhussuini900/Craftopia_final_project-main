import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItemService } from '../../../services/order-item.service';
import { CustomerService } from '../../../services/customer.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../../services/seller.service';


@Component({
  selector: 'app-to-be-delivered-otems',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './to-be-delivered-otems.component.html',
  styleUrl: './to-be-delivered-otems.component.css'
})
export class ToBeDeliveredOtemsComponent {
  @Output() linkClicked = new EventEmitter<string>();

  orderItems:OrderItem [] = [];
  page: number = 1;              
  itemsPerPage: number = 20; 
  filteredProducts: any[] = [];
  priceFrom: number  = 0;
  priceTo: number = 0;
  searchTerm: string = '';
  searchCriteria: string = 'name'; 


  customerIsSet:Boolean = false;
  constructor(
    private orderItemService:OrderItemService,
    private customerService:CustomerService,
    private sellerService:SellerService
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

updateOrderItems(){
  this.orderItemService.getAllDoneOrderItems().subscribe(
    response=>{
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
      this.filteredProducts = this.orderItems;

    },error=>{
      if(error.status === 404){
      }
      console.log("error",error);

    }
  );
}
getCustomer(item:any){
  this.customerService.getCustomerById(item.id).subscribe(
    response=>{

      this.customerService.setCurrentCustomer(response.data);
      sessionStorage.setItem('return-to' , 'done-orders');

      this.linkClicked.emit("show-customer"); 

    },error=>{
      console.log('error getting data:',error);
    }
  );
}

getSeller(item:any){
  this.sellerService.getSellerById(item.id).subscribe(
    response=>{
  this.sellerService.setCurrentSeller(response.data);

  sessionStorage.setItem('return-to' , 'done-orders');
  this.linkClicked.emit("show-seller"); 
  
    },error=>{
  console.log('error happend::',error)
    }
  );
  }


openModal() {
  const modal = document.getElementById("myModal");
  if (modal != null) {
    modal.style.display = "block";

  }
}
closeModal(){
  const modal = document.getElementById("myModal");
  if (modal != null) {
    this.customerIsSet=false;
    modal.style.display = "none";
  }
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


interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  gender: string;

  image: string;
}

interface Customer {
  id: number;
  phone: string;
  address: string;
  status: string;
  total_spent: number;
  user: User;
}
