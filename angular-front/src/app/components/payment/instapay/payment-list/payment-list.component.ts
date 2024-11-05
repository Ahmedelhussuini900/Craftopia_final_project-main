import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent {
  @Output() linkClicked = new EventEmitter<string>();

  // Emit the component identifier when a link is clicked
  onLinkClick(component: string) {
    this.linkClicked.emit(component);
  }
}
