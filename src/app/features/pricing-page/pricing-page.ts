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
      id: 'tpe-pme',
      name: 'TPE/PME',
      description: 'Moyennes équipes',
      highlight: 'Moyennes équipes',
      price: {
        monthly: 250000,
        yearly: 2700000,
      },
      originalPrice: {
        monthly: 250000,
        yearly: 3000000,
      },
      maxUsers: '25',
      storage: '50 GO',
      support: '24/7',
      features: [
        '25 comptes professionnels',
        'Files + Chat + Calendrier',
        'Support technique 24/7',
        'Stockage cloud sécurisé',
        'Collaboration en temps réel',
        'Sécurité avancée',
      ],
      cta: 'Choisir ce pack',
      popular: true,
      enterprise: false,
      pricePerAccount: '10 000 FCFA par compte',
    },
    {
      id: 'enterprise',
      name: 'Entreprise',
      description: 'Flexible',
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
