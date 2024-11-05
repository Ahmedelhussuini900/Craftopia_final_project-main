
import { Component, NgModule, TemplateRef } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule, NgIfContext } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { RouterModule} from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { CustomerHeaderComponent } from "../customer-header/customer-header.component";
import { WishListService } from '../../services/wishlist.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from '../../services/cart.service';

import { FormsModule } from '@angular/forms';

// import { Product } from "../../models/product.model";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FormsModule,
    ProductDetailsComponent,
    CommonModule,
    RouterModule,
    CustomerHeaderComponent,
    NgxPaginationModule
],



  templateUrl: './product-list.component.html',
})

export class ProductListComponent {
  products: Product[] = []; 

  page: number = 1;              
  itemsPerPage: number = 20; 
  category :any;

  filteredProducts: any[] = [];
  priceFrom: number  = 0;
  priceTo: number = 0;
  searchTerm: string = '';
  searchCriteria: string = 'name'; 

  noProductsTemplate: TemplateRef<NgIfContext<any>> | null | undefined;
  constructor(
    private productService: ProductService ,
    private categoryService: CategoryService,
    private router: Router,
    private wishListService: WishListService,
    private cartService:CartService
  ) { }
  


  search() {
    this.filteredProducts = this.products;

    if (this.searchCriteria === 'name' && this.searchTerm) {
        this.filteredProducts = this.filteredProducts.filter(product =>
            product.product_name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    } else if (this.searchCriteria === 'category' && this.searchTerm) {
        this.filteredProducts = this.filteredProducts.filter(product =>
            product.category.category_name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    } else if (this.searchCriteria === 'price') {
        if (this.priceFrom <= this.priceTo ) {
            this.filteredProducts = this.filteredProducts.filter(product =>
                product.priceAfterOffers !== null && 
                product.priceAfterOffers >= this.priceFrom && 
                product.priceAfterOffers <= this.priceTo
            );
        }else{
          alert('the from price must be less than the to price');
        }
    }

    this.page = 1; 
}


  addToCart(product:any) {
    this.cartService.addItem({'product_id':product.id , 'quantity' : 1 }).subscribe(
      response=>{
        alert('added successfully to your cart');
        this.router.navigate(['/cart']);
    
    console.log(response);
      },error=>{
    
    console.log('error Happend::',error);
    if(error.status === 401){
    
      sessionStorage.removeItem('authToken');
      sessionStorage.setItem('loginSession', 'true');
    
      this.router.navigate(['/login']);
    }else if(error.status === 403){
      alert("this product is already in your cart\n check your cart");
    }else{
      alert('some error happend');
    }
      }
      
    );
       }

  moveToCategory(){
    this.router.navigate(['/category']);

  }
  onProductClick (product:any)
  {
    this.productService.setProduct(product);
    this.router.navigate(['/product/view']);

  }
  
  ngOnInit(): void {
    this.category =this.categoryService.getSelectedCategory();
if(this.category){
  this.productService.getProductsByCategory(this.category.id).subscribe(
    response => {
      this.categoryService.setCategory(undefined);
      this.products = response.data; 
      this.products.forEach(product=>{
        product.priceAfterOffers = product.price;
        product.totalOffers=0;  
        
      product.addedOffers.forEach(offerAdded => {
        const endDate = new Date(offerAdded.offer.end_date); 
        const today = new Date(); 
        today.setHours(0, 0, 0, 0); 

if (endDate.getTime() >= today.getTime()) { 
  product.totalOffers +=offerAdded.offer.discount;
  product.priceAfterOffers -= Math.floor((offerAdded.offer.discount / 100) *product.price);

}

      });
    });

      
      
      

    this.filteredProducts =this.products;

    },
    error => {
      if (error.status === 400 || error.status === 500) {
        console.error('A specific error occurred:', error);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  );
}else{

  this.productService.getAllProducts().subscribe(
    response => {
      this.products = response.data; 
      this.products.forEach(product=>{
        product.priceAfterOffers = product.price;
        product.totalOffers=0;  
        
      product.addedOffers.forEach(offerAdded => {
        const endDate = new Date(offerAdded.offer.end_date); 
        const today = new Date(); 
        today.setHours(0, 0, 0, 0); 

if (endDate.getTime() >= today.getTime()) { 
  product.totalOffers +=offerAdded.offer.discount;
  product.priceAfterOffers -= Math.floor((offerAdded.offer.discount / 100) *product.price);
}

      });
    });
    this.filteredProducts =this.products;

    },
    error => {
      if (error.status === 400 || error.status === 500) {
        console.error('A specific error occurred:', error);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  );
  
  
}

  }
}

interface Offer {
  id: number;
  discount: number;
  start_date: string;
  end_date: string;
}

interface OfferItem {
  id: number;
  offer_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  offer: Offer;
}

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  role: string;
}

interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  material: string;
  size: string;
  image: string;
  video: string;
  category:Category
  cover_image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  images: Array<{ id: number; url: string }>;
  addedOffers: OfferItem[];
  user: User;
  total_ordered:string ;

  totalOffers:number;
  priceAfterOffers:number;
}
interface Category {
  id: number;
  category_name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

