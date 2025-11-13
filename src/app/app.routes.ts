import { Routes } from '@angular/router';
import { LandingPage } from './features/landing/landing-page';
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { NotFoundComponent } from './shared/not-found/not-found-component';
import { ContactPage } from './features/contact/contact-page';
import { ThankYou } from './features/thankyou/thankyou';
import { Ressource } from './features/ressource/ressource';
import { Support } from './features/support/support';
import { PricingPage } from './features/pricing-page/pricing-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: LandingPage },
      { path: 'not-found', component: NotFoundComponent },
      { path: 'contact', component: ContactPage },
      { path: 'ressources', component: Ressource },
      { path: 'tarifs', component: PricingPage },
      { path: 'support', component: Support },
      { path: 'merci', component: ThankYou },
    ],
  },
  // Redirection pour toutes les routes non trouvées
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];
