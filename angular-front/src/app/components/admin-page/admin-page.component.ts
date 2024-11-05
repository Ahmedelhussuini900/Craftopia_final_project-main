import { Component } from '@angular/core';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { AllOffersComponent } from './all-offers/all-offers.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllSellersComponent } from './all-sellers/all-sellers.component';
import { BannedCustomersComponent } from './banned-customers/banned-customers.component';
import { RejectedProductsComponent } from './rejected-products/rejected-products.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { AdminViewProductComponent } from './admin-view-product/admin-view-product.component';
import { BannedSellersComponent } from './banned-sellers/banned-sellers.component';
import { CommonModule } from '@angular/common';
import { PendingProductsComponent } from './pending-products/pending-products.component';
import { UserService } from '../../services/user.service';
import { ListContactMessagesComponent } from './list-contact-messages/list-contact-messages.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { SellersOrdersToBeDoneComponent } from './sellers-orders-to-be-done/sellers-orders-to-be-done.component';
import { ToBeDeliveredOtemsComponent } from './to-be-delivered-otems/to-be-delivered-otems.component';
import { ShowCustomerInformationComponent } from '../seller-page/show-customer-information/show-customer-information.component';
import { ShowSellerContactComponent } from './show-seller-contact/show-seller-contact.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    ShowSellerContactComponent,
    ShowCustomerInformationComponent,
    ToBeDeliveredOtemsComponent,
    SellersOrdersToBeDoneComponent,
    SellerOrdersComponent,
    ListContactMessagesComponent,
    AdminHeaderComponent,
    AllCategoriesComponent,
    AllCustomersComponent,
    AllOffersComponent,
    AllProductsComponent,
    AllSellersComponent,
    BannedCustomersComponent,
    BannedSellersComponent,
    RejectedProductsComponent,
    PendingProductsComponent,
    CommonModule,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AdminViewProductComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  activeComponent: string = 'all-products';  
  constructor(
    private userService: UserService,
  ) { }

  showComponent(component: string) {
    console.log('Switching to component:', component);  
    this.activeComponent = component;
  }

  logout(): void {

    this.userService.logOut().subscribe(
      response => {
        sessionStorage.removeItem('authToken');
        window.location.reload();
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
