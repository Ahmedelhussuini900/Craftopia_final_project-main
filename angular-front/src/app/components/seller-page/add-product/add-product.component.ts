import { Component, Output, EventEmitter } from '@angular/core';

import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-add-product',

  imports: [FormsModule
    ,CommonModule
  ],
  standalone: true,

  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  @Output() linkClicked = new EventEmitter<string>();

  fileLimitExceeded = false;
  categories: any[] = [];
  selectedFiles: File[] = []; 
  submitted = false;
  backendErrors: any = {};
  selectedVideo: File | null = null; 
  imageUploaded = false;

  selectedFile: File | null = null;

  constructor(private categoryService: CategoryService,private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getAllCategory();
    if (this.categories.length < 1) {
      this.categoryService.getAllCategories().subscribe(response => {
        this.categories = response.data;
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

  onSubmit(form: any): void {
    this.submitted = true;
    
    if (form.invalid || this.selectedFiles.length === 0 || this.selectedFiles.length > 5) {
      
    }else{
    
    const formData = new FormData();
    formData.append('product_name', form.value.title);
    formData.append('price', form.value.price);
    formData.append('description', form.value.description);
    formData.append('category_id', form.value.category);
    formData.append('stock', form.value.stock);
    formData.append('size', form.value.size);
    formData.append('material', form.value.material);

    // this.selectedFiles.forEach((file, index) => {
    //   formData.append(`image${index}`, file);  
    // });
    if (this.selectedFile) {
      formData.append('cover_image', this.selectedFile);
    }
    this.selectedFiles.forEach((file, index) => {
      formData.append('images[]', file);  
    });
    if (this.selectedVideo) {
      formData.append('video', this.selectedVideo);
    }

    // if (form.value.video) {
    //   formData.append('videos', form.value.video);
    // }

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.productService.addProduct(formData).subscribe(

      response => {
          console.log(response);
          alert('added successfully');
          this.linkClicked.emit('my-products');

        }, error => {
          this.backendErrors = error.error.errors;
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
  openModal() {
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = "block";

    }
  }
  closeModal(){
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = "none";
  
    }
  }
}
