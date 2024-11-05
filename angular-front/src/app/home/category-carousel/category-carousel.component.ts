import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../services/category.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [CarouselModule, RouterModule, CommonModule],
  templateUrl: './category-carousel.component.html',
  styleUrl: './category-carousel.component.css'
})
export class CategoryCarouselComponent {
  customOptions: OwlOptions = {
    loop: true,          
    autoplay: true,      
    autoplayTimeout: 3000, 
    autoplayHoverPause: true,  
    mouseDrag: true,     
    touchDrag: true,     
    navSpeed: 400,       
    navText: ['',''],
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
      1400: { items: 5 }
    },
    nav: false,           
    dots: false      
  };

categories:any [] |null [] =[];
    constructor(private categoryService: CategoryService ,private router: Router) { }


    onCategoryClick(category: any): void {
      this.categoryService.setCategory(category);
      this.router.navigate(['/products']);
    }
    
    
    ngOnInit(): void {
      this.categoryService.getAllCategories().subscribe(response => {
        console.log(response);
        this.categories = response.data;
        this.categories.forEach(element => {
          console.log(element.image);
        });

      },
      error => {
        
        console.error('Registration failed:', error);
        console.log('Error: ' + error.error);

      });
    }
}
