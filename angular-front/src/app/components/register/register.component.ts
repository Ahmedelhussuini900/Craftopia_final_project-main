import { Component , Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { GuestHeaderComponent } from "../guest-header/guest-header.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LottieComponent,
    GuestHeaderComponent
  ],

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 1, overflow: 'visible' })),
      state('out', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      transition('in => out', animate('1s')),
      transition('out => in', animate('0.5s'))
    ])
  ]
})
export class RegisterComponent {
  private animationItem: AnimationItem | undefined;
  private successAnimationItem: AnimationItem | undefined;

  @Output() messageEvent = new EventEmitter<string>();


  registrationAnimationOptions: AnimationOptions = {
    path: 'animations/registration.json',
    loop: false,
    autoplay: true
  };


  successAnimationOptions: AnimationOptions = {
    path: 'animations/registerSuccess.json',
    loop: false,
    autoplay: true
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  successAnimationCreated(animationItem: AnimationItem): void {
    this.successAnimationItem = animationItem;

  }


  isSeller: boolean = false;
  selectedFile: File | null = null;
  submitted: boolean = false;
  imageUploaded = false;
  user:any;
  backendErrors: any = {};

  constructor(private userService: UserService, private router: Router) { }


  onRoleChange(role: string) {
    this.isSeller = (role === 'seller');
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.imageUploaded = event.target.files && event.target.files.length > 0;

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


  onSubmit(registerForm: any) {
    this.submitted = true;
    if (registerForm.valid) {
      const formData = new FormData();
      const deviceName = getDeviceName();
      console.log(deviceName);
      if (deviceName) {
        formData.append('device_name', deviceName);

      }


      Object.keys(registerForm.value).forEach(key => {
        formData.append(key, registerForm.value[key]);
      });

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      console.log(formData);
      this.userService.register(formData).subscribe(
        response => {
          const token = response.token;
          this.userService.setUser(response.user.data);
          this.messageEvent.emit(response.user.data);

          console.log('Registration successful:', response);
          localStorage.setItem('needVarification', 'true');
          localStorage.setItem('tockenForVarification', token);


          this.openModal();
          

        },
        error => {
          if (error.status === 400 || error.status === 500) {
            this.backendErrors = error.error.errors;
            console.error('Registration failed:', error);
            console.log('Error: ' + error.error.errors);

            Object.keys(error.error.errors).forEach(key => {
              console.log('Field:', key);

              error.error.errors[key].forEach((message: String) => {
                console.log('Error message:', message);
              });
            });
          } else {
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
      this.router.navigate(['/varification']);
    }
  }
  ngOnInit(): void {
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
