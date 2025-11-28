export interface PricingPlan {
  id: string;
  name: string;
  highlight: string;
  price: {
    monthly: number;
    yearly: number;
  };
  originalPrice?: {
    monthly: number;
    yearly: number;
  };
  maxUsers: string;
  storage: string;
  support: string;
  features: string[];
  cta: string;
  popular: boolean;
  enterprise: boolean;
  pricePerAccount?: string;
}
