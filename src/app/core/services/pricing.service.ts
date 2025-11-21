import { Injectable } from '@angular/core';
import { PricingPlan } from '../../features/pricing-page/PricingPlan.model';
import { FeatureCard } from '../../shared/components/feature-card/feature-card';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  getPlans(): PricingPlan[] {
    return [
      {
        id: 'tpe-pme',
        name: 'TPE/PME',
        description: 'Moyennes équipes',
        highlight: 'Moyennes équipes',
        price: {
          monthly: 250000,
          yearly: 250000 * 12,
        },
        originalPrice: {
          monthly: 250000,
          yearly: 250000 * 12,
        },
        maxUsers: '25',
        storage: 'Sur mesure',
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
        maxUsers: 'Sur mesure',
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
      },
    ];
  }

  getDetailedFeatures(): FeatureCard[] {
    return [
      {
        category: 'Fonctionnalités de base',
        items: [
          {
            name: 'Comptes professionnels',
            'tpe-pme': '25 comptes',
            enterprise: 'Sur mesure',
          },
          {
            name: 'Stockage cloud',
            'tpe-pme': '50 GO',
            enterprise: 'Sur mesure',
          },
          {
            name: 'Applications incluses',
            'tpe-pme': 'Files, Chat, Calendrier',
            enterprise: 'Suite complète + personnalisé',
          },
        ],
      },
      {
        category: 'Support & Services',
        items: [
          {
            name: 'Support technique',
            'tpe-pme': '24/7 standard',
            enterprise: 'Support dédié prioritaire',
          },
          {
            name: 'SLA',
            'tpe-pme': 'Standard',
            enterprise: 'Personnalisé avec garanties',
          },
          {
            name: 'Formation',
            'tpe-pme': 'Documentation en ligne',
            enterprise: 'Formation personnalisée',
          },
        ],
      },
      {
        category: 'Sécurité & Conformité',
        items: [
          {
            name: 'Sécurité',
            'tpe-pme': true,
            enterprise: true,
          },
          {
            name: 'Authentification 2FA',
            'tpe-pme': true,
            enterprise: true,
          },
          {
            name: 'Conformité RGPD',
            'tpe-pme': true,
            enterprise: true,
          },
        ],
      },
      {
        category: 'Configuration avancée',
        items: [
          {
            name: 'Configuration personnalisée',
            'tpe-pme': false,
            enterprise: true,
          },
          {
            name: 'Intégrations sur mesure',
            'tpe-pme': false,
            enterprise: true,
          },
          {
            name: 'API dédiée',
            'tpe-pme': false,
            enterprise: true,
          },
        ],
      },
    ];
  }

  // Méthode utilitaire pour calculer le prix par compte
  getPricePerAccount(plan: PricingPlan): number {
    if (plan.enterprise) return 0;
    const accountCount = parseInt(plan.maxUsers) || 1;
    return plan.price.monthly / accountCount;
  }
}
