import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-need-varification',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './need-varification.component.html',
  styleUrl: './need-varification.component.css'
})
export class NeedVarificationComponent {
  private successAnimationItem: AnimationItem | undefined;

  successAnimationOptions: AnimationOptions = {
    path: 'animations/email.json',
    loop: true,
    autoplay: true
  };

  successAnimationCreated(animationItem: AnimationItem): void {
    this.successAnimationItem = animationItem;
  }

  user: any;
  isLogged: Boolean = false;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  resendVerificationEmail() {
    this.userService.resendVarification(localStorage.getItem('tockenForVarification')).subscribe(
      response => {
        alert(response.message);
        
    console.log(response);
        },error => {    
          alert('error happend');

          console.log('error happend::: ',error);


      }
    );
    console.log('Resending verification email...');
  }

  ngOnInit(): void {

    if (localStorage.getItem('needVarification')){

    }else{
      this.updateUser();
    }

  }

  reloadPage(): void {

    // window.location.reload();  
    localStorage.removeItem('needVarification');
    localStorage.removeItem('tockenForVarification');

    this.router.navigate(['/login']);


  }
  updateUser() {

    if (sessionStorage.getItem('authToken')) {
      if (this.userService.getCurrentUser()) {
        this.user = this.userService.getCurrentUser();
        this.isLogged = true;


      } else {
        this.userService.getUser().subscribe(
          response => {

            this.user = response.data;
            console.log(this.user)
            if (this.user.email_verified_at){
              this.router.navigate(['/login']);
              localStorage.removeItem('needVarification');
        
            }

          },
          error => {
            if (error.status === 400 || error.status === 500) {
              console.error('A specific error occurred:', error);
            } else if (error.status === 401) {

              sessionStorage.removeItem('authToken');
              this.isLogged = false;

              sessionStorage.setItem('loginSession', 'true');
              this.router.navigate(['/login']);

            } else {
              console.error('An unexpected error occurred:', error);
            }
          }
        );
      }
    } else {
      sessionStorage.removeItem('authToken');
      this.isLogged = false;

      sessionStorage.setItem('loginSession', 'true');
      this.router.navigate(['/login']);
    }
  }



}
