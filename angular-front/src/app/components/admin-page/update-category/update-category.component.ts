import { Component, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ValueChangeEvent } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  selectedFile: File | null = null;
  submitted: boolean = false;
  backendErrors: any = {};
  category:any;


  @Output() linkClicked = new EventEmitter<string>();
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
  constructor(private categoryService: CategoryService ) { }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];

  }

  ngOnInit(): void {

  
  this.category =this.categoryService.getSelectedCategory();
  if(this.category){
console.log(this.category );
  }else{
    this.linkClicked.emit('all-categories');

  }
}


onSubmit(categoryForm: any) {
  this.submitted = true;
  if (categoryForm.valid ) {
    const formData = new FormData();


  
    Object.keys(categoryForm.value).forEach(key => {
      formData.append(key, categoryForm.value[key]);
      console.log('key:' ,key);
      console.log('value:' , categoryForm.value[key]);

    });
    formData.append('id', this.category.id);



    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    console.log('FormData contents:');
formData.forEach((value, key) => {
  console.log(`Key: ${key}, Value: ${value}`);
});

this.categoryService.updateCategory(formData, this.category.id).subscribe(
response=>{
alert('updated successfully');
this.linkClicked.emit('all-categories');

},error=>{

  if (error.status === 422) {
    this.backendErrors = error.error.errors;
    console.log('Error: ' + error.error.errors);

    Object.keys(error.error.errors).forEach(key => {
      console.log('Field:', key);

      error.error.errors[key].forEach((message: String) => {
        console.log('Error message:', message);
      });
    });
  } 
alert('some error happend');
console.log("error happend:: ",error);
}
);

  } else {
    console.error('Form is invalid');
  }
}
}
