import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SellerService } from '../../../services/seller.service';

@Component({
  selector: 'app-seller-header',
  standalone: true,
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class SellerHeaderComponent {
  seller:any;

  @Output() linkClicked = new EventEmitter<string>();

  constructor(private sellerService: SellerService, private userService: UserService ) { }
    onLinkClick(component: string) {
    console.log('Emitting:', component);  // Debugging: check what component is being emitted
    this.linkClicked.emit(component); 
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


  ngOnInit(): void {
    this.sellerData();
    }



    sellerData(){
      if(this.sellerService.getCurrentSelller()){
        this.seller =  this.sellerService.getCurrentSelller();
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
