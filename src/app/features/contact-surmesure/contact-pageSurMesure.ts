import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  OmniApiService,
  SurMesureData,
} from '../../core/services/omni-api.service';

interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  show: boolean;
}

@Component({
  selector: 'app-contact-page-sur-mesure',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [OmniApiService],
  templateUrl: './contact-pageSurMesure.html',
  styleUrl: './contact-pageSurMesure.css',
})
export class ContactPageSurMesure implements OnDestroy {
  formData: SurMesureData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    enterpriseName: '',
    accountNumber: 1,
    message: 'Demande Création Compte Sur Mesure',
  };

  // État du formulaire
  isSubmitting = false;
  formErrors: { [key: string]: string } = {};

  // Système de notifications
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
   * Validation du formulaire
   */
  private validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    // Nom complet
    if (!this.formData.fullName.trim()) {
      this.formErrors['fullName'] = 'Le nom complet est requis';
      isValid = false;
    }

    // Email
    if (!this.formData.email.trim()) {
      this.formErrors['email'] = "L'email est requis";
      isValid = false;
    } else if (!this.isValidEmail(this.formData.email)) {
      this.formErrors['email'] = "L'email n'est pas valide";
      isValid = false;
    }

    // Téléphone
    if (!this.formData.phoneNumber.trim()) {
      this.formErrors['phoneNumber'] = 'Le téléphone est requis';
      isValid = false;
    }

    // Nom entreprise
    if (!this.formData.enterpriseName.trim()) {
      this.formErrors['enterpriseName'] = "Le nom de l'entreprise est requis";
      isValid = false;
    }

    // Nombre de comptes
    if (this.formData.accountNumber < 1) {
      this.formErrors['accountNumber'] =
        'Le nombre de comptes doit être au moins 1';
      isValid = false;
    }

    return isValid;
  }

  /**
   * Validation email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Soumettre le formulaire
   */
  submitForm(form: NgForm): void {
    // Valider le formulaire
    if (!this.validateForm()) {
      this.showNotification(
        'error',
        'Veuillez remplir tous les champs requis correctement'
      );
      return;
    }

    // Empêcher les doubles soumissions
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    // Appel API
    this.apiService
      .submitSurMesure(this.formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.showNotification(
            'success',
            '🎉 Votre demande a été envoyée avec succès ! Redirection...'
          );

          // Réinitialiser le formulaire
          this.resetForm(form);

          // Rediriger vers la page de remerciement après 1.5 secondes
          setTimeout(() => {
            this.router.navigate(['/vous-serez-contacter']);
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
    this.formData = {
      fullName: '',
      email: '',
      phoneNumber: '',
      enterpriseName: '',
      accountNumber: 1,
      message: '',
    };
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

    this.notifications.push(notification);

    // Auto-fermeture après 5 secondes
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
