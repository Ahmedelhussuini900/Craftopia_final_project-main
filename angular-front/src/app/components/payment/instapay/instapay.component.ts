import { Component } from '@angular/core';
import { PaymentListComponent } from "./payment-list/payment-list.component";
import { MobileComponent } from "./mobile/mobile.component";
import { AddressComponent } from "./address/address.component";
import { BankComponent } from "./bank/bank.component";
import { CardComponent } from "./card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instapay',
  standalone: true,
  imports: [PaymentListComponent, MobileComponent, AddressComponent, BankComponent, CardComponent, CommonModule],
  templateUrl: './instapay.component.html',
  styleUrl: './instapay.component.css'
})
export class InstapayComponent {
  activeComponent: string = 'mobile'

  showComponent(component: string) {
    this.activeComponent = component;
  }
}
