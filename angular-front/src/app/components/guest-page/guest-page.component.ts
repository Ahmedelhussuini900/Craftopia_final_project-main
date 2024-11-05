import { Component } from '@angular/core';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest-page',
  standalone: true,
  imports: [ GuestHeaderComponent, CommonModule],
  templateUrl: './guest-page.component.html',
  styleUrl: './guest-page.component.css'
})
export class GuestPageComponent {

 
    images = [
      'images/clay.jpg',
      'images/crafts-advertismen2.jpg',
      'images/crafts-advertisment.jpg'
    ];
    
    defaultImage = 'images/logo.png';
  
    handleError(event: Event) {
      const target = event.target as HTMLImageElement;
      target.src = this.defaultImage; 
    }
  }
  

