import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  ContactData,
  ParticularData,
  OmniApiService,
} from '../../core/services/omni-api.service';

interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  show: boolean;
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [OmniApiService],
  templateUrl: './contact-free.html',
  styleUrl: './contact-free.css',
})
export class ContactFree implements OnDestroy {
  // Données du formulaire
  name = '';
  prenom = '';
  phone = '';
  email = '';
  accountUsername = '';
  readonly emailDomain = '@heritage.africa';

  isSubmitting = false;
  formErrors: { [key: string]: string } = {};

  notifications: Notification[] = [];
  private nextNotificationId = 1;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly apiService: OmniApiService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Obtenir l'email complet du compte
   */

  get fullAccountEmail(): string {
    return this.accountUsername
      ? `${this.accountUsername}${this.emailDomain}`
      : '';
  }
  /**
   * Validation du username (pas d'espaces, caractères spéciaux limités)
   */

  private isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    return usernameRegex.test(username);
  }
  /**
   * Validation email personnel
   */

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  /**
   * Validation téléphone (format international ou local)
   */

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s+()-]{8,20}$/;
    return phoneRegex.test(phone);
  }
  /**
   * Validation du formulaire
   */

  private validateForm(): boolean {
    this.formErrors = {};
    let isValid = true; // Nom

    if (!this.name.trim()) {
      this.formErrors['name'] = 'Le nom est requis';
      isValid = false;
    } // Prénom

    if (!this.prenom.trim()) {
      this.formErrors['prenom'] = 'Le prénom est requis';
      isValid = false;
    } // Téléphone

    if (!this.phone.trim()) {
      this.formErrors['phone'] = 'Le téléphone est requis';
      isValid = false;
    } else if (!this.isValidPhone(this.phone)) {
      this.formErrors['phone'] = 'Format de téléphone invalide';
      isValid = false;
    } // Email personnel

    if (!this.email.trim()) {
      this.formErrors['email'] = "L'email personnel est requis";
      isValid = false;
    } else if (!this.isValidEmail(this.email)) {
      this.formErrors['email'] = "L'email n'est pas valide";
      isValid = false;
    } // Compte à créer

    if (!this.accountUsername.trim()) {
      this.formErrors['account'] = 'Le nom du compte est requis';
      isValid = false;
    } else if (!this.isValidUsername(this.accountUsername)) {
      this.formErrors['account'] =
        'Utilisez uniquement des lettres, chiffres, points, tirets et underscores';
      isValid = false;
    } else if (this.accountUsername.length < 3) {
      this.formErrors['account'] =
        'Le nom du compte doit contenir au moins 3 caractères';
      isValid = false;
    }

    return isValid;
  }
  /**
   * Soumettre le formulaire
   */

  submitForm(form: NgForm): void {
    // Valider le formulaire
    if (!this.validateForm()) {
      this.showNotification(
        'error',
        'Veuillez remplir tous les champs correctement'
      );
      return;
    } // Empêcher les doubles soumissions

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true; // Préparer les données pour le nouveau endpoint "Particular"

    const particularData: ParticularData = {
      firstName: this.prenom, // Prénom
      lastName: this.name, // Nom
      personalEmail: this.email,
      phoneNumber: this.phone,
      nameAccount: this.accountUsername,
      fullAccountEmail: this.fullAccountEmail,
      message: `Création de compte: ${this.fullAccountEmail}`,
    };

    this.apiService
      .submitParticular(particularData) // <--- MODIFICATION ICI
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.showNotification(
            'success',
            '🎉 Votre demande a été envoyée avec succès ! Redirection...'
          ); // Réinitialiser le formulaire

          this.resetForm(form); // Rediriger vers la page de remerciement

          setTimeout(() => {
            this.router.navigate(['/merci']);
          }, 1500);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.showNotification(
            'error',
            error.message || 'Une erreur est survenue. Veuillez réessayer.'
          );
        },
      });
  }
  /**
   * Réinitialiser le formulaire
   */

  private resetForm(form: NgForm): void {
    this.name = '';
    this.prenom = '';
    this.phone = '';
    this.email = '';
    this.accountUsername = '';
    this.formErrors = {};
    form.resetForm();
  }
  /**
   * Afficher une notification
   */

  showNotification(
    type: 'success' | 'error' | 'warning' | 'info',
    message: string
  ): void {
    const notification: Notification = {
      id: this.nextNotificationId++,
      type,
      message,
      show: true,
    };

    this.notifications.push(notification); // Auto-fermeture après 5 secondes

    setTimeout(() => {
      this.closeNotification(notification.id);
    }, 5000);
  }
  /**
   * Fermer une notification
   */

  closeNotification(id: number): void {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) {
      notification.show = false;
      setTimeout(() => {
        this.notifications = this.notifications.filter((n) => n.id !== id);
      }, 300);
    }
  }
  /**
   * Vérifier si un champ a une erreur
   */

  hasError(fieldName: string): boolean {
    return !!this.formErrors[fieldName];
  }
  /**
   * Obtenir le message d'erreur d'un champ
   */

  getError(fieldName: string): string {
    return this.formErrors[fieldName] || '';
  }
}
