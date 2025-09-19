import { Routes } from '@angular/router';
import { NotFoundPage } from './features/not-found/not-found-page/not-found-page';
import { LandingPage } from './features/landing/landing-page/landing-page';
import { PricingPage } from './features/pricing-page/pricing-page';

export const routes: Routes = [

    {
        path: 'home',
        component: LandingPage
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'tarifs',
        component: PricingPage
    },
    {
        path: 'not-found',
        component: NotFoundPage
    },
    {
        path: '**',
        redirectTo: '/not-found',
        pathMatch: 'full'
    },
];
