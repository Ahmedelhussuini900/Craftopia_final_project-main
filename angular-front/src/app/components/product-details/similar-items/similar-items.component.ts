import { Component, NgModule,EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-similar-items',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './similar-items.component.html',
  styleUrl: './similar-items.component.css'
})
export class SimilarItemsComponent {
  products: any; 
  currentProduct: any; 
  category :any;
  @Output() productSelected = new EventEmitter<any>();

  constructor(private productService: ProductService ,private categoryService: CategoryService,private router: Router) { }
  onProductClick(product: any) {
    console.log('Product clicked:', product);
    this.productService.setProduct(product);
    this.productSelected.emit(product);

    // this.router.navigate(['/products/'+product.id]);
}

  ngOnInit(): void {
    if (this.productService.getSelectedProduct() ){
      this.currentProduct =this.productService.getSelectedProduct();
      console.log('product: ',this.currentProduct);

    this.productService.getProductsByCategory(this.currentProduct.category.id).subscribe(
      response => {
        this.products = response.data; 
        console.log('response here here'  , response);
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
    this.router.navigate(['/products']);

  }

}
}
