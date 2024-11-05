import { Component } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-view-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-reviews.component.html',
  styleUrl: './view-reviews.component.css'
})
export class ViewReviewsComponent {

  currentProduct: any; 

  reviews:any;
  constructor(  private productService: ProductService ,  private router: Router,
    private reviewService: ReviewService) { }

    ngOnInit(): void {
      if (this.productService.getSelectedProduct() ){
        this.currentProduct =this.productService.getSelectedProduct();
     this.reviewService.getAllReviews(this.currentProduct.id).subscribe(
      response => {
        this.reviews = response.data;
        
        console.log(this.reviews);
      },
      error => {
        if (error.status === 401) {
          sessionStorage.removeItem('authToken');
          sessionStorage.setItem('loginSession', 'true');
          this.router.navigate(['/login']);
          console.error('A specific error occurred:', error);
        }else {
          console.error('An unexpected error occurred:', error);
        }
      }

     );
      
    }else{
      this.router.navigate(['/products']);

    }
}
  }
  
  