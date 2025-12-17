import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { Tarifs } from './tarifs/tarifs';
import { Avantage } from './avantage/avantage';
import { Fonctionnalite } from './fonctionnalite/fonctionnalite';
import { Process } from './process/process';
import { Temoignage } from './temoignage/temoignage';
import { Faq } from './faq/faq';
import { FinalCTA } from './final-cta/final-cta';
import { VideoModal } from './video-modal/video-modal';

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
    VideoModal,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  @ViewChild(VideoModal) videoModal!: VideoModal;

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

  openVideoDemo() {
    // Fermer le menu mobile s'il est ouvert (au cas où)
    const mobileMenuButton = document.querySelector('[title="menu"]') as HTMLButtonElement;
    if (mobileMenuButton) {
      // Vérifier si le menu est ouvert en regardant les classes
      const menuContainer = mobileMenuButton.closest('nav')?.querySelector('.lg\\:hidden > div');
      if (menuContainer && menuContainer.classList.contains('max-h-screen')) {
        mobileMenuButton.click();
      }
    }

    this.videoModal.openModal();
  }
}
