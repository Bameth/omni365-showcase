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
        // NOUVEAU COÛT MENSUEL : 137 475 FCFA
        monthly: 137475,
        // NOUVEAU COÛT ANNUEL (avec 10% de réduction) : 1 484 730 FCFA
        yearly: 1484730,
      },
      originalPrice: {
        monthly: 137475,
        // COÛT ANNUEL SANS RÉDUCTION : 1 649 700 FCFA
        yearly: 1649700,
      },
      maxUsers: '25',
      // NOUVEAU STOCKAGE : 1 TO
      storage: '1 TO',
      support: '24/7',
      features: [
        // NOUVELLE SOLUTION : Omni365
        '25 comptes professionnels Solution Omni365',
        'Files + Chat + Calendrier',
        // Mise à jour de la fonctionnalité de stockage
        '1 TO de Stockage cloud sécurisé par utilisateur',
        'Support technique 24/7',
        'Collaboration en temps réel',
        'Sécurité avancée',
      ],
      cta: 'Choisir ce pack',
      popular: true,
      enterprise: false,
      // NOUVEAU COÛT PAR COMPTE : 5 499 FCFA par compte
      pricePerAccount: '5 499 FCFA par compte',
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
