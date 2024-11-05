import { Component, Output, EventEmitter } from '@angular/core';
import { SellerService } from '../../../services/seller.service';
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
  @Output() linkClicked = new EventEmitter<string>();

  constructor(private sellerService:SellerService,
    private router:Router
  ){
  }
  ngOnInit(): void {
    this.updateCustomer();
  }
  goBack(){
    console.log(sessionStorage.getItem("return-to"));
    this.linkClicked.emit(sessionStorage.getItem("return-to")?.toString()); 
  }
  updateCustomer(){
    if (this.sellerService.getCurrentSelller()){
      this.seller= this.sellerService.getCurrentSelller();
      
    }else{
      this.linkClicked.emit("seller-orders"); 
    }
  }
  
  
}



