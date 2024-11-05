
import { Component, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [CommonModule, 
    RouterModule, 
    NgxPaginationModule,
    FormsModule],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css'
})
export class AllCategoriesComponent {
  categories:any [] |null [] =[];
  @Output() linkClicked = new EventEmitter<string>();

  page: number = 1;              
  itemsPerPage: number = 10;  

  filteredCategories: any[] = [];
  searchTerm: string = '';

  constructor(private categoryService: CategoryService ,private router: Router) { }
  search() {
    if (this.searchTerm) {
      this.filteredCategories = this.categories.filter(categories =>
        categories.category_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCategories = this.categories; 
    }
  }
  
  ngOnInit(): void {
  this.updateCategories();
  }
updateCategories(){
  this.categoryService.getAllCategories().subscribe(response => {
    this.categories = response.data;
    this.filteredCategories = this.categories; 

   

  },
  error => {
    
    console.error('some error happend:', error);
    // console.log('Error: ' + error.error);

  });
}
  updateCategory(category:any){
    this.categoryService.setCategory(category);
    this.linkClicked.emit('update-category');

  }
  addCategory(){
    this.linkClicked.emit('add-category');

  }
  deleteCategory(category:any){
    this.categoryService.deleteCategory(category.id).subscribe(
response=>{
  this.updateCategories();
  alert('deleted successfully');

},error=>{
console.log('error happened::' , error)
  alert('some error happened during deleting');
}
    );
  }

}
