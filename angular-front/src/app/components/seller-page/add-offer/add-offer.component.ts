import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfferService } from '../../../services/offer.service';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {
  backendErrors: any = {};
  startDate: string | undefined;
  endDate: string | undefined;
  minEndDate: string | undefined;
  submitted = false;
  constructor(private offerService: OfferService) { }
  @Output() linkClicked = new EventEmitter<string>();

  onStartDateChange() {
    if (this.startDate) {
      this.minEndDate = this.startDate;
      if (this.endDate && this.endDate < this.startDate) {
        this.endDate = undefined;
      }
    }
  }

  getErrorMessages(): string[] {
    const errorMessages: string[] = [];
    if (this.backendErrors) {
      Object.keys(this.backendErrors).forEach(key => {
        this.backendErrors[key].forEach((message: string) => {
          errorMessages.push(`${key}: ${message}`);
        });
      });
    }
    return errorMessages;
  }
  onSubmit(form: any) {
    this.submitted = true;
    if (form.valid) {
      const formData = new FormData();
      formData.append('start_date', form.value.startDate);
      formData.append('end_date', form.value.endDate);
      formData.append('discount', form.value.discount);

      this.offerService.addOffer(formData).subscribe(
        response => {
          alert('added successfully');
          console.log('done succesffully', response);
          this.linkClicked.emit('all-seller-offers');

        }, error => {
          console.log('some error happend', error);
          this.backendErrors = error.error.errors;
          if (error.status === 400) {
            this.backendErrors = error.error.errors;

            console.log('Error: ' + error.error.errors);

            Object.keys(error.error.errors).forEach(key => {
              console.log('Field:', key);

              error.error.errors[key].forEach((message: String) => {
                console.log('Error message:', message);
              });
            });
          }else{
            console.log('faild to upload due to:',error);

          }
        }
      )

    }
  }

  submitDates() {
    if (this.startDate && this.endDate) {
      console.log('Start Date:', this.startDate);
      console.log('End Date:', this.endDate);
    }
  }
}
