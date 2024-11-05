import { Component, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-show-customer-information',
  standalone: true,
  imports: [],
  templateUrl: './show-customer-information.component.html',
  styleUrl: './show-customer-information.component.css'
})
export class ShowCustomerInformationComponent {
  @Output() linkClicked = new EventEmitter<string>();

customer:any;
  constructor(private customerService:CustomerService){

}
ngOnInit(): void {
  this.updateCustomer();
}
goBack(){
  // this.linkClicked.emit("done-orders"); 
  this.linkClicked.emit(sessionStorage.getItem("return-to")?.toString()); 


}
updateCustomer(){
  if (this.customerService.getCurrentCustomer()){
    this.customer= this.customerService.getCurrentCustomer();
  }else{

    this.linkClicked.emit(sessionStorage.getItem("return-to")?.toString()); 

  }
}

}
