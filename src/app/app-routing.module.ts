import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LandingPage} from "./pages/landing/landing.page";
import {ChangePasswordPage} from "./pages/change-password/change-password.page";

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
  },
  {
    path: 'user/change-password',
    component: ChangePasswordPage
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
