import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Feature, PricingPlan } from './PricingPlan.model';
import { PricingService } from '../../core/services/pricing.service';

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

  plans: PricingPlan[] = [];
  detailedFeatures: Feature[] = [];

  constructor(private readonly pricingService: PricingService) {}

  ngOnInit(): void {
    this.plans = this.pricingService.getPlans();
    this.detailedFeatures = this.pricingService.getDetailedFeatures();
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

  getFeatureValue(feature: any, plan: string): any {
    return feature[plan];
  }
  isFeatureIncluded(value: any): boolean {
    return value === true || (typeof value === 'string' && value !== 'false');
  }
}
