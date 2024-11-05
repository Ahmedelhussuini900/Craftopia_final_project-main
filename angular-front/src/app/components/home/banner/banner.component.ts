import { Component } from '@angular/core';
import { OrderPaymentService } from '../../../services/order-payment.service';
import {  Router,RouterModule } from '@angular/router';
import { CarouselComponent } from "../../carousel/carousel.component";
@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    RouterModule,
    CarouselComponent
],
  providers: [OrderPaymentService],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  constructor(private OrderPaymentService: OrderPaymentService , private router: Router) { }


  showNow() {
    const requestData = { 'id': 2 };
    console.log('Sending request with data: ', requestData);
    this.OrderPaymentService.requestPayment(requestData).subscribe(
      response => {

        console.log(response);
        const url = response.url;
        window.open(url, '_blank');
      }
      , error => {
        if (error.status === 401) {
          sessionStorage.removeItem('authToken');
          sessionStorage.setItem('loginSession', 'true');
          this.router.navigate(['/login']);
        }
        console.error('An unexpected error occurred:', error);
        alert('an erro happend try again later');
        console.log('error happend::::', error);
      }
    )
  }
}
