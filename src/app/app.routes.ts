import { Routes } from '@angular/router';
import { NotFoundPage } from './features/not-found/not-found-page/not-found-page';
import { LandingPage } from './features/landing/landing-page';
import { MainLayout } from './shared/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [{ path: '', component: LandingPage }],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    component: NotFoundPage,
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
];
