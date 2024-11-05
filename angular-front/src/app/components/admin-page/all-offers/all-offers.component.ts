import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdateProductComponent } from '../../seller-page/update-product/update-product.component';
import { CommonModule } from '@angular/common';
import { OfferService } from '../../../services/offer.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-all-offers',
  standalone: true,
  imports: [CommonModule, 
    NgxPaginationModule,
    FormsModule],
  templateUrl: './all-offers.component.html',
  styleUrl: './all-offers.component.css'
})
export class AllOffersComponent {
  offers: Offer [] =[]; 
  filteredOffers:any;
  page: number = 1;              
  itemsPerPage: number = 10; 
  startDate: string = '';
  endDate: string = '';
  discount: number = 0;
  searchCriteria:string = 'date';
  constructor(private offerService: OfferService) { }





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

  ngOnInit(): void {
    this.updateOffers();  
  }
  delete(offer:any){
    this.offerService.deleteOffer(offer.id).subscribe(
      response=>{
        alert('deleted successfully');
        this.updateOffers();  


      },error=>{
        console.log('error happend::',error);
        alert('error deleting offer');

      }
    );
  }
  isOfferActive(endDate: string): boolean {
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return end >= today;
  }
  updateOffers(){
    this.offerService.getAllOffers().subscribe(
      response=>{
this.offers = response.data;
this.filteredOffers =response.data;

console.log(response);
      },error=>{
        console.log('error getting the data::' , error)

      }
    );  }

}

interface Offer {
  id: number;
  discount: number;
  start_date: string;
  end_date: string;
}