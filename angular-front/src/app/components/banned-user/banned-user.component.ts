import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-banned-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './banned-user.component.html',
  styleUrl: './banned-user.component.css'
})
export class BannedUserComponent {



constructor(private router:Router){}
goToContact(){
  this.router.navigate(['/contact']);
}
back(){
  this.router.navigate(['/login']);

}
ngOnInit(): void {
 if(sessionStorage.getItem('banned')){
  sessionStorage.removeItem('banned');
 }else{
  this.router.navigate(['/login']);

 }
}
}

