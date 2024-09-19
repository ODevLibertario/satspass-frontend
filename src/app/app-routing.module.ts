import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SignUpPage} from "./pages/auth/sign-up/sign-up.page";
import {LandingPage} from "./pages/landing/landing.page";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./pages/manager/manager.module').then(m => m.ManagerModule)
  },
  {
    path: '',
    component: LandingPage
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
