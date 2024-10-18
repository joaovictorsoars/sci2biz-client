import { Routes } from '@angular/router';
import { authenticatedGuard } from '@core/guards/authenticated.guard';
import { authRoutes } from '@features/auth/auth.routes';
import { DashboardComponent } from '@features/dashboard/pages/dashboard/dashboard.component';
import { LandingComponent } from '@features/landing/pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authenticatedGuard],
  },
];
