import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PricingPlan } from './PricingPlan.model';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pricing-page.html',
  styleUrls: ['./pricing-page.css'],
})
export class PricingPage implements OnInit {
  isYearly = false;
  selectedPlan: string | null = null;

  plans: PricingPlan[] = [
    {
      id: 'essai-gratuit',
      name: "Particuliers",
      highlight: 'Essai gratuit',
      price: {
        monthly: 0,
        yearly: 0, // 50000 * 12 * 0.9 (10% de réduction)
      },
      originalPrice: {
        monthly: 0,
        yearly: 0, // 50000 * 12
      },
      maxUsers: '1',
      storage: '10 GO',
      support: '24/7',
      features: [
        '1 compte gratuit',
        'Files + Chat + Calendrier',
        'Support technique 24/7',
        '10 GO de stockage',
      ],
      cta: 'Choisir ce pack',
      popular: false,
      enterprise: false,
      pricePerAccount: '',
    },
    {
      id: 'tpe-pme',
      name: 'TPE/PME',
      highlight: 'Equipe de taille moyenne',
      price: {
        monthly: 137475,
        yearly: 1484730, // avec 10% de réduction
      },
      originalPrice: {
        monthly: 137475,
        yearly: 1649700, // sans réduction
      },
      maxUsers: '25',
      storage: '1 TO',
      support: '24/7',
      features: [
        '25 comptes professionnels (Solution Omni365)',
        'Files + Chat + Calendrier',
        '1 TO de Stockage cloud sécurisé par utilisateur',
        'Support technique 24/7',
        'Collaboration en temps réel',
        'Sécurité avancée',
      ],
      cta: 'Choisir ce pack',
      popular: true,
      enterprise: false,
      pricePerAccount: '5 499 FCFA par compte',
    },
    {
      id: 'enterprise',
      name: 'Entreprise',
      highlight: 'Flexible',
      price: {
        monthly: 0,
        yearly: 0,
      },
      maxUsers: 'Illimité',
      storage: 'Sur mesure',
      support: 'Dédié',
      features: [
        'Nombre de comptes omni sur mesure',
        'Configuration personnalisée',
        'Support dédié',
        'SLA personnalisé',
        'Intégrations sur mesure',
        'Formation équipe',
      ],
      cta: 'Nous contacter',
      popular: false,
      enterprise: true,
      pricePerAccount: 'selon vos besoins',
    },
  ];

  ngOnInit(): void {
    // Plans déjà initialisés
  }

  toggleBilling(): void {
    this.isYearly = !this.isYearly;
  }

  getPlanPrice(plan: PricingPlan): number {
    return plan.enterprise
      ? 0
      : this.isYearly
      ? plan.price.yearly
      : plan.price.monthly;
  }

  getOriginalPrice(plan: PricingPlan): number | null {
    if (!plan.originalPrice || plan.enterprise) return null;
    return this.isYearly
      ? plan.originalPrice.yearly
      : plan.originalPrice.monthly;
  }

  calculateSavings(plan: PricingPlan): number {
    const original = this.getOriginalPrice(plan);
    if (!original) return 0;
    return Math.round(((original - this.getPlanPrice(plan)) / original) * 100);
  }
}
