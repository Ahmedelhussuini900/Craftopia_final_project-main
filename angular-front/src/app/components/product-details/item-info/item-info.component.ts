import { Component, NgModule } from '@angular/core';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { WishListService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-item-info',
  standalone: true,
  imports: [
    ProductDetailsComponent,
    CommonModule
  ],

  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.css'
})
export class ItemInfoComponent {
  product: any; 
  quantity:number = 1;
  coverImage:string='';
  selectedImage: string = '';

  constructor(private productService: ProductService ,
    private categoryService: CategoryService,
    private router: Router,
    private wishListService: WishListService) { }




  onImageClick(image:string){
    this.coverImage =image;
    this.selectedImage = image;
  }
  addOnQuantity(){
    if(this.product.stock > this.quantity)
    this.quantity ++;
  }
  decOnQuantity(){
    if (this.quantity >1){
      this.quantity --; 
    }
  }
  onQuantityChange(value: string) {
    console.log('Quantity changed:', value);
  }
  addToCart(){}


  addToWishList(){
    const formData = new FormData();


      formData.append('product_id', this.product.id);

    
this.wishListService.addItem(formData).subscribe(
  response => {
    console.log(response);
    alert('add successfully');
  },
  error => {
    if (error.status === 401) {
      sessionStorage.removeItem('authToken');
      // alert('need to log in first');
      sessionStorage.setItem('loginSession', 'true');

      this.router.navigate(['/login']);
      console.error('A specific error occurred:', error);
    } else if (error.status === 409){
      alert('already added to your wishlist');
    }else {
      console.error('An unexpected error occurred:', error);
    }
  }
);
  }
  ngOnInit(): void {
    if (this.productService.getSelectedProduct() ){
      this.product =this.productService.getSelectedProduct();
      console.log('product: ',this.product);
      this.coverImage = this.product.cover_image;
    }else{
      this.router.navigate(['/products']);

    }

    
  }
}






// import { Component, NgModule } from '@angular/core';
// import { ProductDetailsComponent } from '../../product-details/product-details.component';
// import { CommonModule } from '@angular/common';
// import { ProductService } from '../../../services/product.service';
// import { CategoryService } from '../../../services/category.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-item-info',
//   standalone: true,
//   imports: [
//     ProductDetailsComponent,
//     CommonModule
//   ],

//   templateUrl: './item-info.component.html',
//   styleUrl: './item-info.component.css'
// })
// export class ItemInfoComponent {
//   product: any; 
//    quantity: number = 0; 

//   constructor(private productService: ProductService ,private categoryService: CategoryService,private router: Router) { }
  
//   onQuantityChange(quantityInput: HTMLInputElement): void {
//     this.quantity = parseInt(quantityInput.value, 10); 
//     if (isNaN(this.quantity)) {
//         this.quantity = 0; 
//     }
//     console.log(this.quantity);
// }
// addToCart(product: any,num:string){

// }
//   ngOnInit(): void {
//     if (this.productService.getSelectedProduct()){
//       this.product =this.productService.getSelectedProduct();
//       console.log('product: ',this.product);

//     }else{
//       this.router.navigate(['/products']);

//     }

    
//   }
// }

