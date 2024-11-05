import { Component } from '@angular/core';
import { CustomerHeaderComponent } from "../customer-header/customer-header.component";
import { CommonModule } from '@angular/common';
import { ReviewComponent } from "../product-details/review/review.component";
import { ViewReviewsComponent } from "../view-reviews/view-reviews.component";
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { WishListService } from '../../services/wishlist.service';
import { ReviewService } from '../../services/review.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CustomerHeaderComponent,
    CommonModule,
    ReviewComponent,
    ViewReviewsComponent,
    ProductDetailsComponent,
    CommonModule,
    FormsModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {


  showVideo = false;
  submitted = false;
  stars: number = 0;
  addToWish :Boolean=false;
  products: Product[]=[]; 
  ratingStars: number = 0;
  user:any;
  reviews: Feedback[] = [];
  product: any;
  offers: Offer[] = [];
  addedOffer: OfferItem[] = [];
  quantity: number = 1;
  coverImage: string = '';
  selectedImage: string = '';




  constructor(private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private reviewService: ReviewService,
    private wishListService: WishListService,
  private cartService:CartService) { }

    onProductClick(product: any) {
      this.productService.setProduct(product);
  
  }
  

  isOfferActive(endDate: string): boolean {
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return end >= today;
  }
  onImageClick(image: string) {
    this.coverImage = image;
    this.selectedImage = image;
  }
  addOnQuantity() {
    if (this.product.stock > this.quantity)
      this.quantity++;
  }
  decOnQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  onQuantityChange(value: string) {
    console.log('Quantity changed:', value);
  }
  addToCart() {
this.cartService.addItem({'product_id':this.product.id , 'quantity' :this.quantity}).subscribe(
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


   addAnotherToCart(product:any) {
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





  addToWishList() {
    const formData = new FormData();
    formData.append('product_id', this.product.id);

    if (this.addToWish){
      this.wishListService.deleteWishlistItem(this.product.id).subscribe(
        response => {
          alert('removesd from wishlist successfully');
          this.addToWish = false;

        }, error => {
          alert('some error happend');
          if (error.status === 400 || error.status === 500) {
            console.error('A specific error occurred:', error);
          } else if (error.status === 401) {
            sessionStorage.removeItem('authToken');
            sessionStorage.setItem('loginSession', 'true');
  
            this.router.navigate(['/login']);
          } else {
            console.error('An unexpected error occurred:', error);
          }
  
        }
      );
    }else{
    this.wishListService.addItem(formData).subscribe(
      response => {
        console.log(response);
        this.addToWish = true;
        alert('added successfully to wishlist');
      },
      error => {
        if (error.status === 401) {
          sessionStorage.removeItem('authToken');
          sessionStorage.setItem('loginSession', 'true');
          this.router.navigate(['/login']);
          console.error('A specific error occurred:', error);
        } else if (error.status === 409) {
          alert('already added to your wishlist');
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    );
  }
  }



  ngOnInit(): void {

    this.componentDataRefresh();
  }
  onproductClick(product:any){
    this.productService.setProduct(product);
    this.componentDataRefresh();
  }

componentDataRefresh(){
  console.log('staaaaaaaaaaaaaaaaaaaaaaaaaaaaaars',this.stars);

  if (this.productService.getSelectedProduct()) {
    this.product = this.productService.getSelectedProduct();
    this.addedOffer = this.product.addedOffers;
    this.offers =[];
    this.addedOffer.forEach(addedOffer => {
      this.offers.push(addedOffer.offer);
    })
    this.offers
    console.log('product: ', this.product);
    this.coverImage = this.product.cover_image;



    this.productService.getProductsByCategory(this.product.category.id).subscribe(
      response => {
        this.products = response.data; 
        this.products.forEach(product=>{
          product.priceAfterOffers = product.price;
          product.totalOffers=0;  
          
        product.addedOffers.forEach(offerAdded => {
          console.log('discount:', offerAdded.offer.discount);
          const endDate = new Date(offerAdded.offer.end_date); 
          const today = new Date(); 
          today.setHours(0, 0, 0, 0); 
  
  if (endDate.getTime() >= today.getTime()) { 
    product.totalOffers +=offerAdded.offer.discount;
    product.priceAfterOffers -= Math.floor((offerAdded.offer.discount / 100) *product.price);
  }
  
        });
      });
        console.log(response.data.email);
      },
      error => {
        if (error.status === 400 || error.status === 500) {
          console.error('A specific error occurred:', error);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    );

  } else {
    this.router.navigate(['/products']);

  }

  this.updateReview();
  if (sessionStorage.getItem('authToken')) {
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();

    } else {
      this.userService.getUser().subscribe(
        response => {

          this.user = response.data;
         

        },
        error => {
         
        }
      );
    }
this.wishListService.isInMyWishlist({'product_id':this.product.id}).subscribe(
response=>{
  this.addToWish=response.message;
console.log('in my wish list?????',response.message);
},error=>{
  console.log('error happend in wishlist data:: ',error);
}
);

  }
}
  deleteReview(review:any){
    this.updateUser(review);
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


  setRating(rating: number) {
    this.ratingStars = rating;
    console.log("Rating set to:", this.ratingStars);
  }
  toggleVideo() {
    this.showVideo = !this.showVideo;
  }
  onSubmit(form: any): void {
    this.submitted = true;

    if (form.invalid) {

    } else {
      const formData = new FormData()
      formData.append('product_id', this.product.id)
      formData.append('feedback', form.value.review)
      formData.append('rating', this.ratingStars.toString())

      this.reviewService.addReview(formData).subscribe(
        response => {
          alert('rating add ');
          this.updateReview();
        },
        error => {
          if (error.status === 401) {
            sessionStorage.removeItem('authToken');
            sessionStorage.setItem('loginSession', 'true');
            this.router.navigate(['/login']);
            console.error('A specific error occurred:', error);
          } else {
            console.error('An unexpected error occurred:', error);
          }
        }

      )

    }
  }

  showReview = false;
  toggleReview() {
    this.showReview = !this.showReview;
  }

  

  updateUser(review:any) {

    if (sessionStorage.getItem('authToken')) {
      if (this.userService.getCurrentUser()) {
        this.user = this.userService.getCurrentUser();
        


      } else {
        this.userService.getUser().subscribe(
          response => {

            this.user = response.data;
          },
          error => {
            if (error.status === 400 || error.status === 500) {
              console.error('A specific error occurred:', error);
            } else if (error.status === 401) {
              sessionStorage.removeItem('authToken');
              sessionStorage.setItem('loginSession', 'true');
              this.router.navigate(['/login']);

            } else {
              console.error('An unexpected error occurred:', error);
            }
          }
        );
      }
      if(this.user.id == review.user.id){
          this.reviewService.deleteReview(review.id).subscribe(
            response=>{
            alert('deleted successfully');
            this.updateReview();

            }, error =>{
              console.log('error happed:::' , error);
              alert('error happend');

            }
          )
      }


      
      
    } else {
      sessionStorage.removeItem('authToken');
      sessionStorage.setItem('loginSession', 'true');
      this.router.navigate(['/login']);
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


