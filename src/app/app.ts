import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';
import { fontAwesomeIcons } from './shared/font-awesome-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('omni365');

  private readonly faIconLibrary = inject(FaIconLibrary);

  ngOnInit(): void {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}
