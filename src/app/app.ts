import { Component, inject, OnInit, signal } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { Header } from "./shared/components/header/header";
import { Footer } from "./shared/components/footer/footer";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  showHeaderFooter = true;

  protected readonly title = signal('omni365');

  private readonly faIconLibrary = inject(FaIconLibrary);

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
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
  ngOnInit(): void {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}
