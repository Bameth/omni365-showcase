import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  ngOnInit(): void {
    // Initialisation du composant
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  onLogoClick(): void {
    this.closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
