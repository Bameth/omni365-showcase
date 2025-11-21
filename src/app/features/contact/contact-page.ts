import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
  // Données du formulaire
  companyName: string = '';
  domainName: string = '';
  accountCount: number = 1;
  phone: string = '';
  contactEmail: string = '';
  fullName: string = '';

  // Liste des comptes
  accounts: Account[] = [];
  newAccountEmail: string = '';
  nextAccountId: number = 1;

  // État du formulaire
  showPaymentModal: boolean = false;
  isProcessing: boolean = false;

  // Données de paiement
  cardNumber: string = '';
  cardName: string = '';
  expiryDate: string = '';
  cvv: string = '';

  // Validation
  formErrors: any = {};

  // Système de notifications
  notifications: Notification[] = [];
  nextNotificationId: number = 1;

  constructor() {}

  // Système de notifications
  showNotification(
    type: 'success' | 'error' | 'warning' | 'info',
    message: string
  ) {
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

  closeNotification(id: number) {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) {
      notification.show = false;
      // Supprimer complètement après l'animation
      setTimeout(() => {
        this.notifications = this.notifications.filter((n) => n.id !== id);
      }, 300);
    }
  }

  // Ajouter un compte à la liste
  addAccount() {
    const email = this.newAccountEmail.trim();

    if (!email) {
      this.showNotification('warning', 'Veuillez entrer une adresse email');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

  // Supprimer un compte de la liste
  removeAccount(id: number) {
    this.accounts = this.accounts.filter((acc) => acc.id !== id);
    this.showNotification('info', 'Compte supprimé');
  }

  // Valider le formulaire principal
  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.companyName.trim()) {
      this.formErrors.companyName = "Le nom de l'entreprise est requis";
      isValid = false;
    }

    if (!this.domainName.trim()) {
      this.formErrors.domainName = 'Le nom de domaine est requis';
      isValid = false;
    }

    if (this.accountCount < 1) {
      this.formErrors.accountCount =
        'Le nombre de comptes doit être au moins 1';
      isValid = false;
    }

    if (!this.phone.trim()) {
      this.formErrors.phone = 'Le téléphone est requis';
      isValid = false;
    }

    if (!this.contactEmail.trim()) {
      this.formErrors.contactEmail = "L'email de contact est requis";
      isValid = false;
    }

    if (!this.fullName.trim()) {
      this.formErrors.fullName = 'Le nom complet est requis';
      isValid = false;
    }

    if (this.accounts.length === 0) {
      this.formErrors.accounts = 'Veuillez ajouter au moins un compte';
      isValid = false;
    }

    return isValid;
  }

  // Soumettre le formulaire principal
  submitForm() {
    if (!this.validateForm()) {
      this.showNotification(
        'error',
        'Veuillez remplir tous les champs requis correctement'
      );
      return;
    }

    // Ouvrir le modal de paiement
    this.showPaymentModal = true;
  }

  // Fermer le modal de paiement
  closePaymentModal() {
    this.showPaymentModal = false;
    this.resetPaymentForm();
  }

  // Réinitialiser le formulaire de paiement
  resetPaymentForm() {
    this.cardNumber = '';
    this.cardName = '';
    this.expiryDate = '';
    this.cvv = '';
  }

  // Formater le numéro de carte
  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.cardNumber = formattedValue;
  }

  // Formater la date d'expiration
  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.expiryDate = value;
  }

  // Valider le paiement
  validatePayment(): boolean {
    if (!this.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      this.showNotification(
        'error',
        'Numéro de carte invalide (16 chiffres requis)'
      );
      return false;
    }

    if (!this.cardName.trim()) {
      this.showNotification('error', 'Le nom sur la carte est requis');
      return false;
    }

    if (!this.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      this.showNotification(
        'error',
        "Date d'expiration invalide (format MM/AA)"
      );
      return false;
    }

    if (!this.cvv.match(/^\d{3}$/)) {
      this.showNotification('error', 'CVV invalide (3 chiffres requis)');
      return false;
    }

    return true;
  }

  // Soumettre le paiement
  async submitPayment() {
    if (!this.validatePayment()) {
      return;
    }

    this.isProcessing = true;

    // Simuler un traitement de paiement
    setTimeout(() => {
      this.isProcessing = false;
      this.closePaymentModal();

      // Afficher un message de succès
      this.showNotification(
        'success',
        '🎉 Paiement effectué avec succès ! Vous recevrez vos accès sous 24h par email.'
      );

      // Réinitialiser le formulaire
      this.resetForm();
    }, 2000);
  }

  // Réinitialiser tout le formulaire
  resetForm() {
    this.companyName = '';
    this.domainName = '';
    this.accountCount = 1;
    this.phone = '';
    this.contactEmail = '';
    this.fullName = '';
    this.accounts = [];
    this.newAccountEmail = '';
    this.formErrors = {};
  }
}
