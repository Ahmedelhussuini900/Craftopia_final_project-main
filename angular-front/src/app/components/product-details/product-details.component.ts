import { Component } from '@angular/core';
import { ItemInfoComponent } from "./item-info/item-info.component";
import { SimilarItemsComponent } from "./similar-items/similar-items.component";
import { ViewReviewsComponent } from "../view-reviews/view-reviews.component";
import { ReviewComponent } from './review/review.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ItemInfoComponent, SimilarItemsComponent, ReviewComponent, ViewReviewsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  handleProductSelected(product: any) {
    console.log('Product selected in parent:', product);
    // this.someOtherFunction(product);
  }
}
