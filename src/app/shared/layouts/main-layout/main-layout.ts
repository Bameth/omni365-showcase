import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-main-layout',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  showHeaderFooter = true;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;

        this.showHeaderFooter = !this.isNotFound(currentUrl);
      });
  }
  private isNotFound(url: string): boolean {
    // Ici, la route NotFound est '**', donc tout ce qui n'est pas défini ailleurs
    // Tu peux matcher exactement les urls qui ne sont pas home ou tarifs
    return !['/', '/home', '/tarifs'].includes(url);
  }
}
