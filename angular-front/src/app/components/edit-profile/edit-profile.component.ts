import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SellerService } from '../../services/seller.service';
import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
 
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',

})




export class EditProfileComponent {
  @Output() linkClicked = new EventEmitter<string>();
  
  
  
isSeller :Boolean = false;
  selectedFile: File | null = null;
  submitted: boolean = false;
  imageUploaded = false;
  backendErrors: any = {};

  constructor(private userService: UserService,private sellerService: SellerService) { }

  seller:any;


  ngOnInit(): void {
    this.sellerData();
    }

  

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.imageUploaded = event.target.files && event.target.files.length > 0;

  }


  
  changePassword(){
  this.sellerService.setCurrentSeller(this.seller);
  this.linkClicked.emit('change-password');
}

  getErrorMessages(): string[] {
    const errorMessages: string[] = [];
    if (this.backendErrors) {
      Object.keys(this.backendErrors).forEach(key => {
        this.backendErrors[key].forEach((message: string) => {
          errorMessages.push(`${key}: ${message}`);
        });
      });
    }
    return errorMessages;
  }

  
  onSubmit(from: any) {
    this.submitted = true;
    if (from.valid) {
      const formData = new FormData();



      
      Object.keys(from.value).forEach(key => {
        formData.append(key, from.value[key]);
      });

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }


   this.sellerService.updateSelller(formData).subscribe(
    response=>{
      alert('updated successfully');
      this.sellerService.setCurrentSeller(response.data);
      this.linkClicked.emit('profile');
    },error=>{
      if (error.status === 400) {
        this.backendErrors = error.error.errors;

        console.error('Registration failed:', error);
        console.log('Error: ' + error.error.errors);

        Object.keys(error.error.errors).forEach(key => {
          console.log('Field:', key);

          error.error.errors[key].forEach((message: String) => {
            console.log('Error message:', message);
          });
        });
      }
      alert('some error happend');
      console.log('error happend',error);
    }
   );
  }
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



