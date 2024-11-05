import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';

import { AuthGuestHeaderComponent } from '../auth-guest-header/auth-guest-header.component';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
    GuestHeaderComponent,
    AuthGuestHeaderComponent,
    CustomerHeaderComponent
  ],

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: any;
  isLogged: Boolean = false;
  userImage: string = '';
  userName: string = '';

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }







  
  logout(): void {

    this.userService.logOut().subscribe(
      response => {
        sessionStorage.removeItem('authToken');
        window.location.reload();
      },
      error => {
        if (error.status === 400 || error.status === 500) {
          console.error('A specific error occurred:', error);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    );


  }

  ngOnInit(): void {

    // console.log(sessionStorage.getItem('authToken'));
    if (sessionStorage.getItem('authToken')) {

      if (this.userService.getCurrentUser()) {
        this.user = this.userService.getCurrentUser();
        this.isLogged = true;


      }else{
        this.userService.getUser().subscribe(
          response => {
  
            this.user = response.data;
            console.log(response);
            console.log(response.data.image);
            this.isLogged = true;

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
    }


  }
}
