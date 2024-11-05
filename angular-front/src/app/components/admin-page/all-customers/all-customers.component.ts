import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-customers',
  standalone: true,
  imports: [CommonModule, 
    NgxPaginationModule,
    FormsModule],
  templateUrl: './all-customers.component.html',
  styleUrl: './all-customers.component.css'
})
export class AllCustomersComponent {
  customers:any [] |null [] =[];
  filteredCustomers: any[] = [];
	  searchTerm: string = '';
  page: number = 1;       

  itemsPerPage: number = 10; 
  constructor(private customerService: CustomerService ) { }
  search() {
    if (this.searchTerm) {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCustomers = this.customers; 
    }
  }
  
  ngOnInit(): void {
    this.updateCustomers();
    }

    banUser(customer:any){
      this.customerService.banCustomer(customer.id).subscribe(
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
      this.customerService.getAllCustomers().subscribe(response => {
        this.customers = response.data;
        this.filteredCustomers = this.customers; 

    
      },
      error => {
        
        console.error('some error happend:', error);
    
      });
    }


}
