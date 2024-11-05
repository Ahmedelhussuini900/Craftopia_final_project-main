import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, CommonModule, FormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  message: string = '';
  token: string | null = null;
  email: string | null = null;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }
  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  submitted: boolean = false;
  onSubmit(mailForm: any) {
    this.submitted = true;
    if (mailForm.valid) {
      const formData = new FormData();
      formData.append('password', mailForm.value['password']);
      formData.append('password_confirmation', mailForm.value['password_confirmation']);

      formData.append('token',  this.token as string);
      formData.append('email', this.email as string);
      console.log( this.token as string);
      console.log( this.email as string);

      this.userService.resetPassword(formData).subscribe(
        response => {
          console.log(response);
          this.openModal();
          this.message = 'All done, lets go to the wbsite';

        }, error => {


          if (error.status === 404 ) {
            this.openModalError();
            this.message = 'try sending another email because this one is currupted';
            } else if (error.status === 401 ) {
              this.openModalError();
              this.message = 'try sending another email because this one is currupted';
              } else{
              this.openModalError();
              this.message = 'some error happend while sending an email please try again later';

          }
          console.error('An unexpected error occurred:', error);

         

        }
      );
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
      this.router.navigate(['/login']);

    }
  }
}
