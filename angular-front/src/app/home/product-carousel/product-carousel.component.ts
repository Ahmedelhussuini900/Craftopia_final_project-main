import { Component, NgModule, TemplateRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule, NgIfContext } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { RouterModule} from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [RouterModule, CommonModule, CarouselModule],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css'
})
export class ProductCarouselComponent {
secondProductExists(_t6: any): any {
throw new Error('Method not implemented.');
}
  customOptions: OwlOptions = {
    loop: true,          
    autoplay: false,      
    autoplayTimeout: 3000, 
    autoplayHoverPause: true,  
    mouseDrag: true,     
    touchDrag: true,     
    navSpeed: 400,       
    navText: ['<','>'],
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
      1400: { items: 5 }
    },
    nav: true,           
    dots: true      
  };
  products: any; 
  category :any;
  noProductsTemplate: TemplateRef<NgIfContext<any>> | null | undefined;
  constructor(private productService: ProductService ,private categoryService: CategoryService,private router: Router) { }
  
  
  onCategoryClick(category: any): void {
    this.categoryService.setCategory(category);
    this.router.navigate(['/products']);
  }
  moveToCategory(){
    this.router.navigate(['/category']);

  }
  onProductClick (product:any)
  {
    this.productService.setProduct(product);
    this.router.navigate(['/products/'+product.id]);

  }
  
  ngOnInit(): void {
    this.category =this.categoryService.getSelectedCategory();
// console.log('category: ',this.category);
if(this.category){
  this.productService.getProductsByCategory(this.category.id).subscribe(
    response => {
      this.products = response.data; 
      console.log('response' , response);
      console.log(response.data.email);
    },
    error => {
      if (error.status === 400 || error.status === 500) {
        console.error('A specific error occurred:', error);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  );
}else{

  this.productService.getAllProducts().subscribe(
    response => {
      this.products = response.data; 
      console.log('response' , response);
      console.log(response.data.email);
    },
    error => {
      if (error.status === 400 || error.status === 500) {
        console.error('A specific error occurred:', error);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  );


}

  } 
}
