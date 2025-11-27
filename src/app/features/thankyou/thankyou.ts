import { AfterViewInit, Component } from '@angular/core';
import lottie from 'lottie-web';

import * as successAnimationData from '../../../assets/lottie/404.json';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [],
  templateUrl: './thankyou.html',
  styleUrl: './thankyou.css',
})
export class ThankYou implements AfterViewInit {
  private readonly lottieAnimationData: any = successAnimationData;

  ngAfterViewInit(): void {
    this.loadLottieAnimation();
  }

  loadLottieAnimation(): void {
    const container = document.getElementById('lottie-success-animation');

    const lottieInstance = (lottie as any).default || lottie;
    const animationData =
      this.lottieAnimationData.default || this.lottieAnimationData;

    if (container && animationData) {
      lottieInstance.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: animationData,
      });
    }
  }
}
