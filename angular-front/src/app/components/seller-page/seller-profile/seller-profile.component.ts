import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SellerService } from '../../../services/seller.service';

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [],
  templateUrl: './seller-profile.component.html',
  styleUrl: './seller-profile.component.css'
})
export class SellerProfileComponent {

  seller:any;

  @Output() linkClicked = new EventEmitter<string>();

  constructor(private sellerService: SellerService, private userService: UserService ) { }
  ngOnInit(): void {
    this.sellerData();
    }

    updateProfile(){
      this.sellerService.setCurrentSeller(this.seller);
      this.linkClicked.emit('edit'); 

    }
    
    sellerData(){
      if(this.sellerService.getCurrentSelller()){
        this.seller =  this.sellerService.getCurrentSelller();
        console.log('seller' , this.seller)

      }else{
      this.sellerService.getSeller().subscribe(
          response=>{
            this.seller =response.data;
            console.log('seller' , this.seller)
          },error=>{
            if(error.status === 401){
              alert('login first please');
            }
            console.log('error happend is:: ',error);

          }
        );
      }
    }


}


