import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banned-customers',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,FormsModule],
  templateUrl: './banned-customers.component.html',
  styleUrl: './banned-customers.component.css'
})
export class BannedCustomersComponent {

  customers:any [] |null [] =[];
  page: number = 1;              
  itemsPerPage: number = 10; 
  filteredCustomers: any[] = [];
  searchTerm: string = '';
  constructor(private customerService: CustomerService ) { }
  ngOnInit(): void {
    this.updateCustomers();
    }
    search() {
      if (this.searchTerm) {
        this.filteredCustomers = this.customers.filter(customer =>
          customer.user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredCustomers = this.customers; 
      }
    }
    activate(customer:any){
      this.customerService.unBanCustomer(customer.id).subscribe(
        response=>{
          this.updateCustomers();
alert('user banned successfully');
        },error=>
          {
            alert('some error happend');
            console.log('error happend',error);

          }
      );
    }
    updateCustomers(){
      this.customerService.getAllBannedCustomers().subscribe(response => {
              this.customers = response.data;
              this.filteredCustomers = this.customers;
    
      },
      error => {
        
        console.error('some error happend:', error);
    
      });
    }


}

