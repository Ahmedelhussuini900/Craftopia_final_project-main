import { Component } from '@angular/core';
import { CustomerHeaderComponent } from "../customer-header/customer-header.component";
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { CustomerService } from '../../services/customer.service';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CustomerHeaderComponent,
    CommonModule,
    LottieComponent,
    RouterModule,
    FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  submitted:boolean = false;
  cartItems: CartItem[] = [];
  user: any;
  customer: any;
  totalPrice: number = 0;
  totalPriceAfterOffers: number = 0;
  totalOffers: number = 0;


  private successAnimationItem: AnimationItem | undefined;
  constructor(private customerService: CustomerService,
    private userService: UserService,
    private router: Router,
    private cartService: CartService,
    private orderService:OrderService,
  ) { }

  successAnimationOptions: AnimationOptions = {
    path: 'animations/confirmation.json',
    loop: true,
    autoplay: true
  };
  successAnimationCreated(animationItem: AnimationItem): void {
    this.successAnimationItem = animationItem;
  }

  ngOnInit(): void {
    this.updateCartItems();
    this.updateCustomer();
  }

  onSubmit(form:any){
    this.submitted = true;
    if (this.totalPrice<=0){
      alert('nothing to buy add products to your cart first');
      this.router.navigate(['/products']);

      return;
    }
    if(form.valid){
      const formData = new FormData();

      
      Object.keys(form.value).forEach(key => {
        formData.append(key, form.value[key]);
      });
      formData.append('total',this.totalPriceAfterOffers.toString());
      'phone'
            'address'
            'total' 
      

      this.orderService.addOrder(
        {
        'phone': form.value['phone'] , 
        'address':form.value['address'],
        'total' :this.totalPriceAfterOffers 
        }
      ).subscribe(
        response=>{
          alert("order added successfully");
          this.router.navigate(['/order']);

          console.log('order added::',response);
        },error=>{
          console.log('error happend',error);
        }
      );

    }
  }


  updateCustomer() {
    this.customerService.getCustomer().subscribe(
      response => {
        this.customer = response.data;
        console.log('customer::' , response.data);
      }, error => {
        console.log('an error happend:', error);
        if (error.status === 401) {
          sessionStorage.removeItem('authToken');
          sessionStorage.setItem('loginSession', 'true');
          this.router.navigate(['/login']);
        }

      }
    );
  }


  openModal() {
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = "block";

    }
  }
  closeModal() {
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = "none";
    }

  }

  updateCartItems() {
    this.cartService.getAllItems().subscribe(
      response => {
        this.cartItems = response.data;

        this.cartItems.forEach(item => {
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

  // updateUser() {

  //   console.log(sessionStorage.getItem('authToken'));
  //   if (sessionStorage.getItem('authToken')) {
  //     this.userService.getUser().subscribe(
  //       response => {
  //         this.userService.setUser(response.user);
  //       },
  //       error => {
  //         if (error.status === 400 || error.status === 500) {
  //           console.error('A specific error occurred:', error);
  //         } else if (error.status === 401) {
  //           sessionStorage.removeItem('authToken');
  //           sessionStorage.setItem('loginSession', 'true');
  //           this.router.navigate(['/login']);
  //         } else {
  //           console.error('An unexpected error occurred:', error);
  //         }
  //       }
  //     );
  //   } else {
  //     sessionStorage.setItem('loginSession', 'true');
  //     this.router.navigate(['/login']);

  //   }

  // }
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