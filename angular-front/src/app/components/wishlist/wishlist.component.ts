import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { WishListService } from '../../services/wishlist.service';
import { CommonModule, NgIfContext } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  products: Product[] = [];
  noOfProducts: number = 0;

  user: any;
  constructor(private wishlistService: WishListService,
    private productService: ProductService,
    private userService: UserService,
    private router: Router) { }




  onProductClick(product: any) {
    this.productService.setProduct(product);
    this.router.navigate(['/product/view']);
  }
  addToCart(product: any) {

  }
  delete(product: any) {
    this.wishlistService.deleteWishlistItem(product.id).subscribe(
      response => {
        alert('deleted successfully');
        console.log(response);

this.updateProducts();
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
  }
  ngOnInit(): void {
    console.log(sessionStorage.getItem('authToken'));
    if (sessionStorage.getItem('authToken')) {
      this.userService.getUser().subscribe(
        response => {
          this.user = response.date;
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
    } else {
      sessionStorage.setItem('loginSession', 'true');

      this.router.navigate(['/login']);

    }



this.updateProducts();
  }

  updateProducts(){

    this.productService.getProductsInWishlist().subscribe(
      response => {
        console.log('hererererere');
        console.log(response);
        this.products = response.data;
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
        this.noOfProducts = this.products.length;
        console.log('products after:', this.products);



        console.log('response', response);
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
  }
}




interface Offer {
  id: number;
  discount: number;
  start_date: string;
  end_date: string;
}

// Interface for each item in addedOffers
interface OfferItem {
  id: number;
  offer_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  offer: Offer;
}

// Interface for the Product User
interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  role: string;
}

// Interface for the Product
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
  totalOffers: number;
  priceAfterOffers: number;
}