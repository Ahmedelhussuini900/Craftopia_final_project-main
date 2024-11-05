import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  private animationItem: AnimationItem | undefined;

  options: AnimationOptions = {
    path: 'animations/Animation.json',
    loop: true,
    autoplay: true
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
