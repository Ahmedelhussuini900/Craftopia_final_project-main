import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ValueChangeEvent } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-admin-view-product',
  standalone: true,
   imports: [CommonModule,
    FormsModule
  ], 

  templateUrl: './admin-view-product.component.html',
  styleUrl: './admin-view-product.component.css'
})
export class AdminViewProductComponent {
  product: any; 
  stars: number = 0;
  addedOffer: OfferItem[] = [];

  coverImage: string = '';
  selectedImage: string = '';
  reviews: Feedback[] = [];
  offers: Offer[] = [];

  @Output() linkClicked = new EventEmitter<string>();
  constructor(private productService: ProductService ,
     private reviewService:ReviewService) { }

  onImageClick(image: string) {
    this.coverImage = image;
    this.selectedImage = image;
  }
moveBack(){
  this.linkClicked.emit('');

}

ngOnInit(): void {
  this.updateProducts();  
  this.updateReview();
}


deleteReview(review:any){
  this.reviewService.deleteReview(review.id).subscribe(
    response=>{
    alert('deleted successfully');
    this.updateReview();

    }, error =>{
      console.log('error happed:::' , error);
      alert('error happend');

    }
  );
}
updateProducts(){

  if (this.productService.getSelectedProduct()){
this.product = this.productService.getSelectedProduct();
this.coverImage = this.product.cover_image;

this.addedOffer = this.product.addedOffers;
this.offers =[];
this.addedOffer.forEach(addedOffer => {
  this.offers.push(addedOffer.offer);
})
this.offers
console.log('product: ', this.product);
this.coverImage = this.product.cover_image;



console.log('my productdndk' ,this.product);
  }else{
    this.linkClicked.emit('all-products');

  }
}

updateReview(){
  this.reviewService.getAllReviews(this.product.id).subscribe(
    response => {
      this.reviews = response.data;
      this.stars=0;

      this.reviews.forEach(review => {
        this.stars += review.rating;

      });
if (this.reviews.length > 0) {
this.stars = Math.floor(this.stars / this.reviews.length);

}else{
this.stars = 0;
}


    }, error => {

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
  last_name: string;
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
interface Feedback {
  id: number;
  feedback: string;
  rating: number;
  user: User;
  product: Product;
}



