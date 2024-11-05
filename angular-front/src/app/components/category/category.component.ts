
import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerHeaderComponent } from "../customer-header/customer-header.component";
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


  @Component({
    selector: 'app-category',
    standalone: true,
    imports: [FormsModule , CommonModule, RouterModule, CustomerHeaderComponent, NgxPaginationModule],


    templateUrl: './category.component.html',
    styleUrl: './category.component.css'
  })
  export class CategoryComponent {
  categories:any [] |null [] =[];
  filteredCategories: any[] = [];
  page: number = 1;              
  itemsPerPage: number = 20; 
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

    onCategoryClick(category: any): void {
      this.categoryService.setCategory(category);
      this.router.navigate(['/products']);
    }
    
    
    ngOnInit(): void {
      this.categoryService.getAllCategories().subscribe(response => {
        console.log(response);
        this.categories = response.data;
        this.filteredCategories = this.categories; 

     

      },
      error => {
        
        console.error('Error getting data:', error);

      });
    }

  }
