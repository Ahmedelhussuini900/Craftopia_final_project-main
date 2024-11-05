import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [LottieComponent,],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  private loadingAnimationItem: AnimationItem | undefined;

  loadingAnimationOptions: AnimationOptions = {
     path: 'animations/searching-for-files.json',
     loop: true,
     autoplay: true
   };
   animationCreated(animationItem: AnimationItem): void {
    this.loadingAnimationItem = animationItem;
  }
}
