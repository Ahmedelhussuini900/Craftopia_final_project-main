import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class ProductService {
    // private apiUrl = 'http://0.0.0.0:8000/api/products'; 
    private apiUrl = environment.apiUrl+'/products';


    constructor(private http: HttpClient) { }
    private selectedProduct: any;

    setProduct(product: any) {
      this.selectedProduct = product;

    }
  
    getSelectedProduct() {
      return this.selectedProduct;
    }

    private allProducts: any [] = [];

    setAllProduct(products: any) {
      this.allProducts = products;

    }
  
    getAllProduct() {
      return this.allProducts;
    }


    getProduct(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/${id}`, { headers });
    }


    

    getLatestProducts(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.get(`${this.apiUrl}/most-selled`, { headers });
  }

    getProductsInWishlist(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.get(`${this.apiUrl}/wishlist/all`, { headers });
  }

    

    getAllProducts(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl, { headers });
    }
    
    getMostOfferedProducts(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl+'/most-offered', { headers });
    }
    
    getMostOfferedProductsSeller(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl+'/most-ordered-seller', { headers });
    }

    getDeletedProducts(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl+"/deleted", { headers });
    }

    

    getProductsByCategory(categotyId: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(`${this.apiUrl}/byCategory/${categotyId}`, { headers });
    }

    getProductsRecent(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(`${this.apiUrl}/recent`, { headers });
    }

    deleteProduct(id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }

    restoreProduct(id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.get(`${this.apiUrl}/restore/${id}`, { headers });
    }


   
    addProduct(productData: any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.post(this.apiUrl,productData, { headers });
      // return this.http.post(this.apiUrl,productData);

    }


    getMyProducts(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.get(this.apiUrl+'/myProduct', { headers });

    }

    updateProduct(productData: any ): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.post(`${this.apiUrl}/update`,productData, { headers });
    }

    getProductsByOffer(offer_id: string ): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.get(`${this.apiUrl}/byOffer/${offer_id}`, { headers });
    }


    

}



