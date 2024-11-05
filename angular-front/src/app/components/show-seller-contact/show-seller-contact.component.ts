import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { RouterModule , Router } from '@angular/router';

@Component({
  selector: 'app-show-seller-contact',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './show-seller-contact.component.html',
  styleUrl: './show-seller-contact.component.css'
})
export class ShowSellerContactComponent {
  seller:any;

  constructor(private sellerService:SellerService,
    private router:Router
  ){
  }
  ngOnInit(): void {
    this.updateCustomer();
  }
  goBack(){
    this.router.navigate(['/order/view']);
  }
  updateCustomer(){
    if (this.sellerService.getCurrentSelller()){
      this.seller= this.sellerService.getCurrentSelller();
      
    }else{
      this.router.navigate(['/order/view']);
    }
  }
  
  
}



