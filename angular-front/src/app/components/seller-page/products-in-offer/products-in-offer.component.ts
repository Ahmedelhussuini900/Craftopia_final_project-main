import { Component, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { OfferService } from '../../../services/offer.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-products-in-offer',
  standalone: true,
  imports: [CommonModule
    ,FormsModule, NgxPaginationModule],
  templateUrl: './products-in-offer.component.html',
  styleUrl: './products-in-offer.component.css'
})
export class ProductsInOfferComponent {
  @Output() linkClicked = new EventEmitter<string>();
  offer: any;
  products: Product[] = [];
  page: number = 1;              
  itemsPerPage: number = 20; 

  filteredProducts: any[] = [];
  priceFrom: number  = 0;
  priceTo: number = 0;
  searchTerm: string = '';
  searchCriteria: string = 'name'; 
  constructor(
    private productService: ProductService, private offerService: OfferService) { }
  ngOnInit(): void {
    this.getOffer();

    this.updateProducts();
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
  getOffer() {
    if (this.offerService.getCurrentOffer()) {
      this.offer = this.offerService.getCurrentOffer();
    } else {
      this.linkClicked.emit('all-seller-offers');

    }
  }

  deleteProduct(product: any) {
this.offerService.removeProduct({'product_id':product.id , 'offer_id':this.offer.id}).subscribe(
  response=>{
    alert('removed successfully');
    this.updateProducts();
    console.log('success', response);
  },error=>{

    alert('some error happend');
    console.log('error happend', error);
  }
);
  }
  updateProducts() {
    this.productService.getProductsByOffer(this.offer.id).subscribe(
      response => {
        this.products = response.data;
        this.filteredProducts = this.products;
        this.products.forEach(product => {
          product.priceAfterOffers = product.price;
          product.totalOffers = 0;

          product.addedOffers.forEach(offerAdded => {
            const endDate = new Date(offerAdded.offer.end_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (endDate.getTime() >= today.getTime()) {
              product.totalOffers += offerAdded.offer.discount;
              product.priceAfterOffers -= (offerAdded.offer.discount / 100) * product.price;
            }

          });
        });
        console.log('my products::', this.products);
      }, error => {
        console.log('there is an error :; ', error)
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
  category: Category
  cover_image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  images: Array<{ id: number; url: string }>;
  addedOffers: OfferItem[];
  user: User;
  totalOffers: number;
  priceAfterOffers: number;
}
interface Category {
  id: number;
  category_name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

