import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SellerService } from '../../../services/seller.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  @Output() linkClicked = new EventEmitter<string>();



  submitted: boolean = false;
  imageUploaded = false;
  backendErrors: any = {};

  constructor(private userService: UserService) { }

  seller: any;
  onSubmit(form: any) {
    this.submitted = true;

    if (form.valid && this.passwordsMatch()) {
      const formData = new FormData();




      Object.keys(form.value).forEach(key => {
        formData.append(key, form.value[key]);
      });


      this.userService.updatePassword(formData).subscribe
        (
          response => {
            alert('password updated successfully');
            console.log('respose:: ', response);
            this.linkClicked.emit('profile');

          }, error => {

            console.log('error happend:::>>>', error);
            if (error.status === 401) {
              alert('the password is invalid');
            } else if (error.status === 400) {
              this.backendErrors = error.error.errors;

              console.error('Registration failed:', error);
              console.log('Error: ' + error.error.errors);

              Object.keys(error.error.errors).forEach(key => {
                console.log('Field:', key);

                error.error.errors[key].forEach((message: String) => {
                  console.log('Error message:', message);
                });
              });

            }else{

              alert('there is an error happend try again later');
            }

          }
        );
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
  passwordsMatch(): boolean {
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('password_confirmation') as HTMLInputElement).value;
    return newPassword === confirmPassword;
  }
}
