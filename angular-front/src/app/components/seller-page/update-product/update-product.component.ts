import { Component, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ValueChangeEvent } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
 
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
product:any;
submitted:boolean = false;
categories: any[] = [];
selectedVideo: File | null = null; 
imageUploaded = false;
selectedFile: File | null = null;
fileLimitExceeded = false;
selectedFiles: File[] = []; 

backendErrors: any = {};

coverImage:string='';
selectedImage: string = '';
getErrorMessages(): string[] {
  const errorMessages: string[] = [];
  if (this.backendErrors) {
    Object.keys(this.backendErrors).forEach(key => {
      this.backendErrors[key].forEach((message: string) => {
        errorMessages.push(`${key}: ${message}`);
      });
    });
  }
  return errorMessages;
}
@Output() linkClicked = new EventEmitter<string>();
  constructor( private categoryService: CategoryService,
    private productService: ProductService  ) {}
  ngOnInit(): void {
    this.updateProduct();
    this. updateCategories();
  }
  updateCategories(){
    this.categories = this.categoryService.getAllCategory();
    console.log('categories:: ', this.categories);

    if (this.categories.length < 1) {
      this.categoryService.getAllCategories().subscribe(response => {
        this.categories = response.data;
        console.log('categories:: ', this.categories);
      }, error => {
        console.log('failure is: ', error);
      });

    }
  }

  onCoverImageSelect(event: any) {
    this.selectedFile = event.target.files[0];
    this.imageUploaded = event.target.files && event.target.files.length > 0;

  }

  onVideoSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedVideo = event.target.files[0]; 
      // console.log('Selected Video:', this.selectedVideo);
    }
  }
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      // this.selectedFiles = Array.from(event.target.files); 
      if (event.target.files.length > 5) {
        this.fileLimitExceeded = true;
        this.selectedFiles = [];
      } else {
        this.fileLimitExceeded = false;
        this.selectedFiles = Array.from(event.target.files); 
      }    }
  }

  updateProduct(){
    if(this.productService.getSelectedProduct()){
this.product = this.productService.getSelectedProduct();
    }else{
      this.linkClicked.emit('my-products'); 

    }
    this.coverImage = this.product.cover_image;
  }

  onImageClick(image:string){
    this.coverImage =image;
    this.selectedImage = image;
  }
  onSubmit(form: any): void {
    this.submitted = true;
    
    if (form.invalid  || this.selectedFiles.length > 5) {
      
    }else{
    
    const formData = new FormData();
    formData.append('product_name', form.value.title);
    formData.append('price', form.value.price);
    formData.append('description', form.value.description);
    formData.append('category_id', form.value.category);
    formData.append('stock', form.value.stock);
    formData.append('size', form.value.size);
    formData.append('material', form.value.material);
    formData.append('id', this.product.id);

 
    if (this.selectedFile) {
      formData.append('cover_image', this.selectedFile);
    }
    this.selectedFiles.forEach((file, index) => {
      formData.append('images[]', file);  
    });
    if (this.selectedVideo) {
      formData.append('video', this.selectedVideo);
    }

  

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.productService.updateProduct(formData).subscribe(

      response => {
          console.log(response);
          this.linkClicked.emit('my-products'); 


        }, error => {
          this.backendErrors = error.error.errors;
          console.log('error happend::' ,error);
          alert("error happend:");
          if (error.status === 400) {
            this.backendErrors = error.error.errors;

            console.error('Registration failed:', error);
            console.log('Error: ' + error.error.errors);

            Object.keys(error.error.errors).forEach(key => {
              console.log('Field:', key);

              error.error.errors[key].forEach((message: String) => {
                console.log('Error message:', message);
              });
            });
          }else{
            console.log('faild to upload due to:',error);

          }
    });
  
    }
  }

}
