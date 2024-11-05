import { Component } from '@angular/core';

@Component({
  selector: 'app-my-cancellations',
  standalone: true,
  imports: [],
  templateUrl: './my-cancellations.component.html',
  styleUrl: './my-cancellations.component.css'
})
export class MyCancellationsComponent {
  activeComponent: string = 'view-order'; 

  viewOrder() {
    this.activeComponent = 'view-order'; 
  }
}
