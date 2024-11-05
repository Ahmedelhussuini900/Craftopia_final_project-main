import { Component } from '@angular/core';
import { HomeContentComponent } from '../home-content/home-content.component';
import { BannerComponent } from '../banner/banner.component';
import { LatestProductsComponent } from '../latest-products/latest-products.component';
import { RouterModule ,Router } from '@angular/router';
import { CarouselComponent } from "../../carousel/carousel.component";
import { CategoryCarouselComponent } from "../../../home/category-carousel/category-carousel.component";
import { ProductCarouselComponent } from "../../../home/product-carousel/product-carousel.component";
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    HomeContentComponent,
    BannerComponent,
    LatestProductsComponent,
    RouterModule,
    CarouselComponent,
    CategoryCarouselComponent,
    ProductCarouselComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
products:Product[] = [];
  constructor(private productService:ProductService,
    private router:Router,
    private cartService:CartService
  ){}
  ngOnInit(): void {
this.updateProducts();
  }
  viewProduct(product:any){

    this.productService.setProduct(product);
    this.router.navigate(['/product/view']);
  }
  updateProducts(){
this.productService.getMostOfferedProducts().subscribe(
  response=>{
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
  },error=>{
console.log('an error happpend ::' , error)
  }
);
  }
  addToCart(product:any) {
    this.cartService.addItem({'product_id':product.id , 'quantity' :1}).subscribe(
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

