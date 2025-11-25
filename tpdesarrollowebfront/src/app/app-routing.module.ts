import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  //Auth publico
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },

  //Rutas privadas
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart.module').then(m => m.CartModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import('./features/invoices/invoice.module').then(m => m.InvoiceModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
