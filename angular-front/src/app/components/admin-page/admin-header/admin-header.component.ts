import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
user:any;
  @Output() linkClicked = new EventEmitter<string>();
  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  
  onLinkClick(component: string) {
    console.log('Emitting:', component);
    this.linkClicked.emit(component);
  }

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
    this.updateUser();
    console.log('i am herer');
  }

  updateUser() {

    if (sessionStorage.getItem('authToken')) {
      if (this.userService.getCurrentUser()) {
        this.user = this.userService.getCurrentUser();
      } else {
        this.userService.getUser().subscribe(
          response => {
            this.user = response.data;
            console.log(this.user)
            if (this.user.email_verified_at){
              localStorage.removeItem('needVarification');        
            }
          },
          error => {
            if (error.status === 400 || error.status === 500) {
              console.error('A specific error occurred:', error);
            } else if (error.status === 401) {
              sessionStorage.removeItem('authToken');
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

      sessionStorage.setItem('loginSession', 'true');
      this.router.navigate(['/login']);
    }
  }
  
}
