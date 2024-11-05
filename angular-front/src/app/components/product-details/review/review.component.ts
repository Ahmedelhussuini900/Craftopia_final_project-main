import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../../../services/product.service';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-review',
  imports: [FormsModule
    ,CommonModule
  ],
  standalone: true,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  product: any; 

  submitted = false;
  constructor(private productService: ProductService ,
    private router: Router,
    private reviewService: ReviewService) { }
    onSubmit(form: any): void {
      this.submitted = true;
       
    if (form.invalid ) {
      
    }else{
      const formData = new FormData()
      formData.append('product_id',this.product.id)
      formData.append('feedback',form.value.review)
      formData.append('rating',form.value.rating)

      this.reviewService.addReview(formData).subscribe(
        response => {
          alert('rating add ');
        },
        error => {
          if (error.status === 401) {
            sessionStorage.removeItem('authToken');
            // alert('need to log in first');
            sessionStorage.setItem('loginSession', 'true');
      
            this.router.navigate(['/login']);
            console.error('A specific error occurred:', error);
          }else {
            console.error('An unexpected error occurred:', error);
          }
        }

      )
      
    }
    }  
  ngOnInit(): void {
    if (this.productService.getSelectedProduct() ){
      this.product =this.productService.getSelectedProduct();
      console.log('product: ',this.product);

    }else{
      this.router.navigate(['/products']);

    }

    
  }
}

