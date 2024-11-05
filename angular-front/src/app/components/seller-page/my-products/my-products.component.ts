import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent {
  @Output() linkClicked = new EventEmitter<string>();
  filteredProducts: any[] = [];
  priceFrom: number  = 0;
  priceTo: number = 0;
  searchTerm: string = '';
  searchCriteria: string = 'name'; 

  products:Product[] = [];
  page: number = 1;              
  itemsPerPage: number = 10; 
  constructor(
    private productService: ProductService  ) {}
    ngOnInit(): void {
      this.updateProducts();
    }
    addProduct(){
      this.linkClicked.emit('add-product'); 

    }
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

    deleteProduct(product:any){

    this.productService.deleteProduct(product.id).subscribe(
      response=>{
        alert('deleted sucessfully ');
        this.updateProducts();  

      },error=>{
        alert('some error happend ');
        console.log('error happend:::',error );

      }
    )
  
    }
    showProduct(product:any){
      this.productService.setProduct(product);
      this.linkClicked.emit('view-product'); 

    }
    updateProduct(product:any){
      this.productService.setProduct(product);
      this.linkClicked.emit('update-product'); 

    }

updateProducts(){
  this.productService.getMyProducts().subscribe(
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
  product.priceAfterOffers -= Math.floor((offerAdded.offer.discount/100) *product.price);
}

      });
    });
    this.filteredProducts = this.products;
  },error=>{
      console.log('there is an error :; ',error)
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

