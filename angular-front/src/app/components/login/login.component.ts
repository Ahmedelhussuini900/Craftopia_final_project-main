import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { GuestHeaderComponent } from "../guest-header/guest-header.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LottieComponent,
    GuestHeaderComponent
],

  // providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private logInAnimationItem: AnimationItem | undefined;
  private successAnimationItem: AnimationItem | undefined;

  logInAnimationOptions: AnimationOptions = {
     path: 'animations/craft.json',
     loop: true,
     autoplay: true
   };
 
  logInAnimationCreated(animationItem: AnimationItem): void {
     this.logInAnimationItem = animationItem;
   }
 
   successAnimationOptions: AnimationOptions = {
    path: 'animations/success.json', // Correct path
    loop: false,
    autoplay: true
  };
   successAnimationCreated(animationItem: AnimationItem): void {
    this.successAnimationItem = animationItem;
  }
  loginErrorBool:boolean  =false;
  sessionError:boolean  =false;
  loginError :string ='';
  submitted: boolean = false;
  user:any;
  backendErrors: any = {};

  constructor(private userService: UserService ,   private router: Router) { }
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
  ngOnInit(): void {
    if (sessionStorage.getItem('loginSession')){
      sessionStorage.removeItem('loginSession');

      this.sessionError = true;
    }


    if (localStorage.getItem('needVarification')){
      window.location.href = '/varification';

    }else{
      this.updateUser();
    }
  }


  updateUser() {

    if (sessionStorage.getItem('authToken')) {
      if (this.userService.getCurrentUser()) {
        this.user = this.userService.getCurrentUser();
        if (this.user.email_verified_at){
          window.location.href = '/home';
        }else{
          window.location.href = '/varification';

        }

      } else {
        this.userService.getUser().subscribe(
          response => {

            this.user = response.data;
            console.log(this.user)
            if (this.user.email_verified_at){
              window.location.href = '/home';
            }else{
              window.location.href = '/varification';

            }

          },
          error => {
            if (error.status === 400 || error.status === 500) {
              console.error('A specific error occurred:', error);
            } else if (error.status === 401) {

              sessionStorage.removeItem('authToken');
              sessionStorage.setItem('loginSession', 'true');
              

            } else {
              console.error('An unexpected error occurred:', error);
            }
          }
        );
      }
    } else {
      sessionStorage.removeItem('authToken');
       }
       
  }

  onSubmit(loginForm: any) {
    this.loginErrorBool = false;
    this.loginError = '';
    this.submitted = true;
    if (loginForm.valid) {
      const formData = new FormData();

      const deviceName = getDeviceName();
      console.log(deviceName);

      if (deviceName) {
        formData.append('device_name', deviceName);

      }
      Object.keys(loginForm.value).forEach(key => {
        formData.append(key, loginForm.value[key]);
      });
   


      this.userService.login(formData).subscribe(
        response => {
          const token = response.token;

          if(response.user.email_verified_at){
            if(response.status == 'banned'){
              sessionStorage.setItem('banned', 'true')
              this.router.navigate(['/banned']);

            }else{
              sessionStorage.setItem('authToken', token);
              sessionStorage.setItem('logged', 'true');
              localStorage.removeItem('needVarification');
              localStorage.removeItem('tockenForVarification');
  
              window.location.href = '/home';
            }

           
  
          }else{
            localStorage.setItem('needVarification', 'true');
            localStorage.setItem('tockenForVarification', token);

            window.location.href = '/varification';

          }
          


        },
        error => {
          if (error.status === 400) {
            this.backendErrors = error.error.errors;

            console.error('Registration failed:', error);
            console.log('Error: ' + error.error.errors);

            Object.keys(error.error.errors).forEach(key => {
              console.log('Field:', key);

              error.error.errors[key].forEach((message: String) => {
                console.log('Error message:', message);
              });
            });
          } else if(error.status === 401){
            this.loginErrorBool = true;
            this.loginError = 'password is not correct, try again later';
          } else if(error.status === 404){
            this.loginErrorBool = true;
            this.loginError = 'email dose not exists, make suer to enter the correct email';

          }else {
            console.error('An unexpected error occurred:', error);
          }
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  openModal() {
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = "block";

    }
  }
  closeModal(){
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = "none";
    }
    
  }
}
function getDeviceName(): string {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return 'Android Device';
  } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return 'iOS Device';
  } else if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  } else if (/Win/i.test(userAgent)) {
    return 'Windows PC';
  } else if (/Mac/i.test(userAgent)) {
    return 'Macintosh';
  } else if (/Linux/i.test(userAgent)) {
    return 'Linux';
  } else {
    return 'Unknown Device';
  }

  
}