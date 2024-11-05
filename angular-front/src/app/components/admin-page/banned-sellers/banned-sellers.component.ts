import { Component } from '@angular/core';
import { SellerService } from '../../../services/seller.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banned-sellers',
  standalone: true,
  imports: [CommonModule, 
    NgxPaginationModule,
    FormsModule],
  templateUrl: './banned-sellers.component.html',
  styleUrl: './banned-sellers.component.css'
})
export class BannedSellersComponent {
  sellers:any [] |null [] =[];
  page: number = 1;              
  itemsPerPage: number = 10;
  filteredSellers: any[] = [];
  searchTerm: string = '';

  constructor(private sellerService: SellerService ) { }
  ngOnInit(): void {
    this.updateSellers();
    }
    search() {
      if (this.searchTerm) {
        this.filteredSellers= this.sellers.filter(seller =>
          seller.user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredSellers = this.sellers; 
      }
    }
    activate(seller:any){
      this.sellerService.unBanSeller(seller.id).subscribe(
        response=>{
          this.updateSellers();
alert('user Activated successfully');
        },error=>
          {
            alert('some error happend');
            console.log('error happend',error);

          }
      );
    }
    updateSellers(){
      this.sellerService.getAllBannedSellers().subscribe(response => {
        this.sellers = response.data;
        this.filteredSellers=this.sellers ;
    
      },
      error => {
        
        console.error('some error happend:', error);
    
      });
    }


}
