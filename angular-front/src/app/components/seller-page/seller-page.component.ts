import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MyProductsComponent } from './my-products/my-products.component';
import { AddProductComponent } from "./add-product/add-product.component";
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { RegisterComponent } from "../register/register.component";
import { SellerHeaderComponent } from './seller-header/seller-header.component';
import { AddOfferComponent } from "./add-offer/add-offer.component";
import { ProductOffersComponent } from "./product-offers/product-offers.component";
import { AllSellerOffersComponent } from "./all-seller-offers/all-seller-offers.component";
import { SellerService } from '../../services/seller.service';
import { UserService } from '../../services/user.service';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AdminViewProductComponent } from './admin-view-product/admin-view-product.component';
import { ProductsInOfferComponent } from './products-in-offer/products-in-offer.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { SellersOrdersToBeDoneComponent } from './sellers-orders-to-be-done/sellers-orders-to-be-done.component';
import { ToBeDeliveredOtemsComponent } from './to-be-delivered-otems/to-be-delivered-otems.component';
import { ShowCustomerInformationComponent } from './show-customer-information/show-customer-information.component';


@Component({
  selector: 'app-seller-page',
  standalone: true,
  imports: [ 
    ShowCustomerInformationComponent,
    SellersOrdersToBeDoneComponent,
    SellerOrdersComponent,
    AddProductComponent,
      AdminViewProductComponent,
      UpdateProductComponent,
      CommonModule,
      SellerHeaderComponent,
      MyProductsComponent, 
      AddProductComponent, 
      EditProfileComponent, 
      RegisterComponent, 
      AddOfferComponent, 
      ProductOffersComponent, 
      AllSellerOffersComponent,
      ProductsInOfferComponent,
    SellerProfileComponent,
    ChangePasswordComponent,
    StatisticsComponent,
    ToBeDeliveredOtemsComponent],
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']  
})
export class SellerPageComponent {
  
  activeComponent: string = 'my-products';
  seller:any;
  user:any;

  constructor(private sellerService: SellerService, private userService: UserService ) { }

  showComponent(component: string) {
    this.activeComponent = component;
  }
  ngOnInit(): void {
    this.sellerData();
    }

    sellerData(){
      this.sellerService.getSeller().subscribe(
          response=>{
            this.seller =response.data;
            console.log('seller' , this.seller)
this.sellerService.setCurrentSeller(this.seller);
          },error=>{
            if(error.status === 401){
              alert('login first please');
            }
            console.log('error happend is:: ',error);

          }
        );
      }

    
}
