import { Component } from '@angular/core';
import { Tarifs } from './tarifs/tarifs';
import { Avantage } from './avantage/avantage';
import { Fonctionnalite } from './fonctionnalite/fonctionnalite';
import { Process } from './process/process';
import { Temoignage } from './temoignage/temoignage';
import { Faq } from './faq/faq';
import { FinalCTA } from './final-cta/final-cta';

@Component({
  selector: 'app-landing-page',
  imports: [
    Tarifs,
    Avantage,
    Fonctionnalite,
    Process,
    Temoignage,
    Faq,
    FinalCTA,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  hovered: string = '';
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
