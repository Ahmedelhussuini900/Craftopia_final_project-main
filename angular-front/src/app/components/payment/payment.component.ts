import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MethodsListComponent } from "./methods-list/methods-list.component";
import { FawryComponent } from "./fawry/fawry.component";
import { InstapayComponent } from "./instapay/instapay.component";
import { WalletComponent } from "./wallet/wallet.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    RouterOutlet,
    MethodsListComponent,
    FawryComponent,
    InstapayComponent,
    WalletComponent,
    CommonModule
],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  activeComponent: string = 'fawry'

  showComponent(component: string) {
    this.activeComponent = component;
  }
}
