import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgIfContext } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CustomerHeaderComponent,
    RouterModule,
    CommonModule
  ],
  providers: [UserService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  empty:boolean=true;
  totalPrice: number = 0;
  totalPriceAfterOffers: number = 0;
  totalOffers: number = 0;

  cartItems: CartItem[] = [];
  user: any;
  constructor(private userService: UserService,
    private router: Router,
    private cartService: CartService) { }


  ngOnInit(): void {
    this.updateCartItems();
    this.updateUser();
  }
  downQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateItem({ 'stock': item.quantity - 1 }, item.id).subscribe(
        response => {
          item.quantity--;

          this.totalPrice -= (item.product.price);
          this.totalPriceAfterOffers -= (item.product.priceAfterOffers);
          this.totalOffers -= (item.product.price - item.product.priceAfterOffers);

        }, error => {
          alert('error happend while updating\n theck your network please')
          console.log('error updating::', error);
        }
      );

    }
  }
  addQuantity(item: any) {

    if (item.product.stock > item.quantity) {

      this.cartService.updateItem({ 'stock': item.quantity + 1 }, item.id).subscribe(
        response => {
          item.quantity++;
          this.totalPrice += (item.product.price);
          this.totalPriceAfterOffers += (item.product.priceAfterOffers);
          this.totalOffers += (item.product.price - item.product.priceAfterOffers);

        }, error => {
          alert('error happend while updating\n theck your network please')
          console.log('error updating::', error);
        }
      );

    } else {
      alert('no enough products in our stock\n max is: ' + item.product.stock);
    }
  }


  deleteItem(item: any) {
    this.cartService.deleteItem(item.id).subscribe(
      response => {
        alert('deleted successfully');

        this.updateCartItems();
      }, error => {
        alert('an error happend!!');
        console.log('an error happend::', error);
      }
    );
  }
  updateUser() {

    console.log(sessionStorage.getItem('authToken'));
    if (sessionStorage.getItem('authToken')) {
      this.userService.getUser().subscribe(
        response => {
          this.userService.setUser(response.user);
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

  }
  updateCartItems() {
    this.cartService.getAllItems().subscribe(
      response => {
        this.cartItems = response.data;
if(this.cartItems.length>0){
  this.empty = false;
}else{
  this.empty = true;

}
        this.cartItems.forEach(item => {
          if(item.product.stock < item.quantity){
            item.quantity = item.product.stock +1;
            this.downQuantity(item);
          }else if(item.product.stock == 0){
            this.deleteItem(item);
            return;
          }
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

          this.totalPrice += (item.product.price) * item.quantity;
          this.totalPriceAfterOffers += (item.product.priceAfterOffers) * item.quantity;
          this.totalOffers += (item.product.price - item.product.priceAfterOffers) * item.quantity;


        });


        console.log('my cart data::', response);
      }, error => {
        console.log('error happend', error);
        if (error.status === 401) {
          sessionStorage.removeItem('authToken');
          sessionStorage.setItem('loginSession', 'true');
          this.router.navigate(['/login']);
        }
      }
    );
  }


}



interface Offer {
  id: number;
  start_date: string;
  end_date: string;
  discount: number;
}

interface AddedOffer {
  id: number;
  offer: Offer;
  offer_id: number;
  product_id: number;
}

interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  cover_image: string;
  size: string;
  material: string;
  video: string;

  totalOffers: number;
  priceAfterOffers: number;

  addedOffers: AddedOffer[];
}

interface CartItem {
  id: number;
  quantity: number;
  user_id: number;
  product_id: number;
  product: Product;
}