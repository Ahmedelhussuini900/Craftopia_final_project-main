import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { RouterModule ,Router } from '@angular/router';

@Component({
  selector: 'app-contact-msg',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
 
  templateUrl: './contact-msg.component.html',
  styleUrl: './contact-msg.component.css'
})
export class ContactMsgComponent {
  submitted: boolean = false;
  imageUploaded = false;
  backendErrors: any = {};


  constructor(private customerService: CustomerService,
    private contactService:ContactService,
    private router :Router
  ) { }

  customer: any = {
    user: {
      name: '',
      email: ''
    },
    phone: ''
  };



  ngOnInit(): void {
    this.customerData();
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
      this.contactService.setMessage(formData).subscribe(
        response=>{
          alert('message sent successfully');
          this.router.navigate(['/home']);


        },error=>{
          console.log('error happend::',error);
          alert('an error happend while uploding')
        }
      );
  }
}
  customerData(){
    if(this.customerService.getCurrentCustomer()){
      this.customer =  this.customerService.getCurrentCustomer();
      console.log('customer', this.customer)

    }else{
    this.customerService.getCustomer().subscribe(
        response=>{
          this.customer =response.data;
          console.log('customer data', this.customer)
        },error=>{
          if(error.status === 401){
          }
          console.log('error happend is:: ',error);

        }
      );
    }
  }


}
