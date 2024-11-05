import { Component } from '@angular/core';
import { CustomerHeaderComponent } from "../customer-header/customer-header.component";

@Component({
  selector: 'app-customer-m-account',
  standalone: true,
  imports: [CustomerHeaderComponent],
  templateUrl: './customer-m-account.component.html',
  styleUrl: './customer-m-account.component.css'
})
export class CustomerMAccountComponent {

}
