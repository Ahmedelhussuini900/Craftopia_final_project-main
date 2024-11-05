import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from '../../../services/offer.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-seller-offers',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
     NgxPaginationModule],
  templateUrl: './all-seller-offers.component.html',
  styleUrl: './all-seller-offers.component.css'
})
export class AllSellerOffersComponent {
  offers: Offer [] =[]; 
  filteredOffers:any;
  page: number = 1;              
  itemsPerPage: number = 10; 
  startDate: string = '';
  endDate: string = '';
  discount: number = 0;
  searchCriteria:string = 'date';

  @Output() linkClicked = new EventEmitter<string>();

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.updateOffers();  
  }

  search() {
    if (new Date(this.startDate) > new Date(this.endDate)) {
        alert('Start date must be before end date.');
        return;
    }
    if (this.searchCriteria === 'date' ){
      if(this.startDate !='' && this.endDate != ''){
        this.filteredOffers = this.offers.filter(offer => {
          const offerStartDate = new Date(offer.start_date);
          const offerEndDate = new Date(offer.end_date);
          const isWithinDateRange = offerStartDate >= new Date(this.startDate) && offerEndDate <= new Date(this.endDate);

          return isWithinDateRange;
      });
      }
    }else if(this.searchCriteria === 'discount' ){
      this.filteredOffers = this.offers.filter(offer => {
        const isWithinDiscount = offer.discount >= this.discount;

        return isWithinDiscount;
    });
    }
    
    this.page = 1; 

}

  addOffer(){
    this.linkClicked.emit('add-offer');

  }
  getProducts(offer:any){
    this.offerService.setCurrentOffer(offer);
    this.linkClicked.emit('product-in-offer');

  }
  deleteOffer(offer:any){
    this.offerService.deleteOffer(offer.id).subscribe(
      response=>{
        alert('deleted successfully');
        this.updateOffers();  


      },error=>{
        console.log('error happend::',error);
        alert('error deleting offer');

      }
    );}
addProductsToOffer(offer:any){
  this.offerService.setCurrentOffer(offer);
  this.linkClicked.emit('product-offers');

}

  updateOffers(){
    this.offerService.getMyOffers().subscribe(
      response=>{
this.offers = response.data;
this.filteredOffers = this.offers;
      },error=>{
        console.log('error getting the data::' , error)

      }
    );  }
    isOfferActive(endDate: string): boolean {
      const end = new Date(endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return end >= today;
    }
  
}


interface Offer {
  id: number;
  discount: number;
  start_date: string;
  end_date: string;
}
