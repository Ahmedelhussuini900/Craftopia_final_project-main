import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-cart-content',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './cart-content.component.html',
  styleUrl: './cart-content.component.css'
})
export class CartContentComponent {

}
