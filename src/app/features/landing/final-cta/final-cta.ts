import { Component } from '@angular/core';

@Component({
  selector: 'app-final-cta',
  imports: [],
  templateUrl: './final-cta.html',
  styleUrl: './final-cta.css',
})
export class FinalCTA {
  scrollToTarifs() {
    const element = document.getElementById('tarifs');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
