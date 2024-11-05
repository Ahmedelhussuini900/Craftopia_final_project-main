import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListPartComponent } from './list-part/list-part.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerOverviewComponent } from './customer-account/customer-account.component';
import { CustomerHeaderComponent } from "../customer-header/customer-header.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { WishlistComponent } from "../wishlist/wishlist.component";
import { MyCancellationsComponent } from '../cutomer-profile/my-cancellations/my-cancellations.component';
import { ViewOrderComponent } from '../view-order/view-order.component';
import { ChangePasswordComponent } from '../seller-page/change-password/change-password.component';
import { CustomerService } from '../../services/customer.service';

import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule, 
    ListPartComponent, 
    CustomerInfoComponent, 
    CustomerOrdersComponent,
    CustomerOverviewComponent, 
    CustomerHeaderComponent, 
    EditProfileComponent,
    WishlistComponent, 
    MyCancellationsComponent, 
    ViewOrderComponent,
    ChangePasswordComponent
  ],
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'] 
})
export class CustomerProfileComponent {
  customer:any;
 activeComponent: string = 'profile'
 constructor(private router:Router,private customerService:CustomerService){}
 ngOnInit(): void {
  this.updateCustomer();
}

updateCustomer() {
  this.customerService.getCustomer().subscribe(
    response => {
      this.customer = response.data;
this.customerService.setCurrentCustomer(this.customer);

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

  showComponent(component: string) {
    this.activeComponent = component;
  }
}
