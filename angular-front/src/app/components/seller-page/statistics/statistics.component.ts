import { Component, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  products:Product[] = [];
  page: number = 1;              
  itemsPerPage: number = 20; 
  @Output() linkClicked = new EventEmitter<string>();

  constructor(private productService:ProductService,
  ){}
  ngOnInit(): void {
    this.updateProducts();
      }
      showProduct(product:any){
    
        this.productService.setProduct(product);
        this.linkClicked.emit('view-product'); 

      }
      updateProducts(){
    this.productService.getMostOfferedProductsSeller().subscribe(
      response=>{
        this.products = response.data;
        // console.log('my data::::::::::::::::::::::;;>>>',this.products);
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

