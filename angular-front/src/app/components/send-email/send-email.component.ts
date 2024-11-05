import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css'
})
export class SendEmailComponent {

  user: any;
  errorMessage:string ='';
  isLogged: Boolean = false;
  hasError: Boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  submitted: boolean = false;
  onSubmit(mailForm: any) {
    this.submitted = true;
    if (mailForm.valid) {
      const formData = new FormData();
      formData.append('email', mailForm.value['email']);
     
      this.userService.resetSendEmail(formData).subscribe(
        response => {
console.log(response);
this.openModal();
this.errorMessage = 'A mail has been sent to your email, please check your email to reset your current password';

        },error =>{
          
          if (error.status === 404 ) {
            this.openModalError();
            this.errorMessage = 'this mail dose not exist, make sure to register first';
            } else {
              this.openModalError();
              this.errorMessage = 'some error happend while sending an email please try again later';

            console.error('An unexpected error occurred:', error);
          }

console.log('error happend::' , error);

        }
      );
    }
  }




  ngOnInit(): void {

    this.updateUser();
  }



  updateUser() {

    if (sessionStorage.getItem('authToken')) {
      if (this.userService.getCurrentUser()) {
        this.user = this.userService.getCurrentUser();
        this.isLogged = true;
        if (this.user.email_verified_at){
          alert('already logged in');
          this.router.navigate(['/home']);
        }else{
          alert('already logged in but need email varification');
          this.router.navigate(['/varification']);

        }


      } else {
        this.userService.getUser().subscribe(
          response => {

            this.user = response.data;
            this.isLogged = true;
            if (this.user.email_verified_at){
              alert('already logged in');
              this.router.navigate(['/home']);
            }else{
              alert('already logged in but need email varification');
              this.router.navigate(['/varification']);
    
            }

          },
          error => {
            if (error.status === 400 || error.status === 500) {
              console.error('A specific error occurred:', error);
            } else if (error.status === 401) {

              sessionStorage.removeItem('authToken');
              this.isLogged = false;

            } else {
              console.error('An unexpected error occurred:', error);
            }
          }
        );
      }
    } else {
      sessionStorage.removeItem('authToken');
      this.isLogged = false;

    }
  }


  openModalError() {
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = "block";

    }
  }
  closeModalError(){
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = "none";
    }
  }




  openModal() {
    const modal = document.getElementById("myModalSuccess");
    if (modal != null) {
      modal.style.display = "block";

    }
  }
  closeModal(){
    const modal = document.getElementById("myModalSuccess");
    if (modal != null) {
      modal.style.display = "none";
    }
  }
}
