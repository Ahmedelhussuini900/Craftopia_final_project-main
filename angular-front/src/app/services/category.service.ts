import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl+'/categories';

    // private apiUrl = 'http://0.0.0.0:8000/api/categories'; 
    
    private selectedCategory: any;

    setCategory(category: any) {
      this.selectedCategory = category;

    }
  
    getSelectedCategory() {
      return this.selectedCategory;
    }

    private allCategory: any [] = [];

    setAllCategory(categorys: any) {
      this.allCategory = categorys;

    }
  
    getAllCategory() {
      return this.allCategory;
    }


    constructor(private http: HttpClient) {
      // console.log('CategoryService instance created');

     }

    getCategory(id: string): Observable<any> {
        
        return this.http.get(`${this.apiUrl}/${id}`);
    }


    getAllCategories(): Observable<any> {
      return this.http.get(this.apiUrl);
    }

    deleteCategory(id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }


   
    addCategory(categoryData: any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.post(this.apiUrl,categoryData, { headers });
    }


    
    updateCategory(categoryData: FormData, id: string): Observable<any> {

console.log('form service')
      categoryData.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
      return this.http.post(`${this.apiUrl}/update`, categoryData);
    }

}



