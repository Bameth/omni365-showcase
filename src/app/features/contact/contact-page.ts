import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  ContactData,
  OmniApiService,
} from '../../core/services/omni-api.service';

interface Account {
  id: number;
  email: string;
}

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
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage implements OnDestroy {
  // Données du formulaire principal
  companyName = '';
  domainName = '';
  accountCount = 1;
  phone = '';
  contactEmail = '';
  fullName = '';
  message = 'Contact pour création de compte Omni';

  // Liste des comptes
  accounts: Account[] = [];
  newAccountEmail = '';
  private nextAccountId = 1;

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
   * Ajouter un compte à la liste
   */
  addAccount(): void {
    const email = this.newAccountEmail.trim();

    if (!email) {
      this.showNotification('warning', 'Veuillez entrer une adresse email');
      return;
    }

    // Validation email
    if (!this.isValidEmail(email)) {
      this.showNotification(
        'error',
        'Veuillez entrer une adresse email valide'
      );
      return;
    }

    // Vérifier les doublons
    if (this.accounts.some((acc) => acc.email === email)) {
      this.showNotification(
        'warning',
        'Cette adresse email existe déjà dans la liste'
      );
      return;
    }

    this.accounts.push({
      id: this.nextAccountId++,
      email: email,
    });

    this.newAccountEmail = '';
    this.showNotification('success', 'Compte ajouté avec succès');
  }

  /**
   * Supprimer un compte de la liste
   */
  removeAccount(id: number): void {
    this.accounts = this.accounts.filter((acc) => acc.id !== id);
    this.showNotification('info', 'Compte supprimé');
  }

  /**
   * Validation email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validation du formulaire
   */
  private validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    // Nom complet
    if (!this.fullName.trim()) {
      this.formErrors['fullName'] = 'Le nom complet est requis';
      isValid = false;
    }

    // Email de contact
    if (!this.contactEmail.trim()) {
      this.formErrors['contactEmail'] = "L'email de contact est requis";
      isValid = false;
    } else if (!this.isValidEmail(this.contactEmail)) {
      this.formErrors['contactEmail'] = "L'email n'est pas valide";
      isValid = false;
    }

    // Téléphone
    if (!this.phone.trim()) {
      this.formErrors['phone'] = 'Le téléphone est requis';
      isValid = false;
    }

    // Nom entreprise
    if (!this.companyName.trim()) {
      this.formErrors['companyName'] = "Le nom de l'entreprise est requis";
      isValid = false;
    }

    // Nom de domaine
    if (!this.domainName.trim()) {
      this.formErrors['domainName'] = 'Le nom de domaine est requis';
      isValid = false;
    }

    // Nombre de comptes
    if (this.accountCount < 1) {
      this.formErrors['accountCount'] =
        'Le nombre de comptes doit être au moins 1';
      isValid = false;
    }

    // Liste des comptes
    if (this.accounts.length === 0) {
      this.formErrors['accounts'] = 'Veuillez ajouter au moins un compte';
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
        'Veuillez remplir tous les champs requis correctement'
      );
      return;
    }

    // Empêcher les doubles soumissions
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    // Préparer les données
    const contactData: ContactData = {
      fullName: this.fullName,
      email: this.contactEmail,
      phoneNumber: this.phone,
      enterpriseName: this.companyName,
      domainName: this.domainName,
      accountNumber: this.accountCount,
      accountList: this.accounts.map((acc) => acc.email).join(', '),
      message: this.message || '',
    };

    // Appel API
    this.apiService
      .submitContact(contactData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.showNotification(
            'success',
            '🎉 Votre commande a été envoyée avec succès ! Redirection...'
          );

          // Réinitialiser le formulaire
          this.resetForm(form);

          // Rediriger vers la page de remerciement après 1.5 secondes
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
    this.companyName = '';
    this.domainName = '';
    this.accountCount = 1;
    this.phone = '';
    this.contactEmail = '';
    this.fullName = '';
    this.message = '';
    this.accounts = [];
    this.newAccountEmail = '';
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
