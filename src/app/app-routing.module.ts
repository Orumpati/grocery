import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RestrictloginGuard } from './restriclogin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/landingpage',
    pathMatch: 'full',
    
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path: 'landingpage',
    loadChildren: () => import('./landingpage/landingpage.module').then( m => m.LandingpagePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'loginpage',
    loadChildren: () => import('./loginpage/loginpage.module').then( m => m.LoginpagePageModule)
  },
  {
    path: 'otp-login',
    loadChildren: () => import('./otp-login/otp-login.module').then( m => m.OtpLoginPageModule)
  },
  {
    path: 'dummy',
    loadChildren: () => import('./dummy/dummy.module').then( m => m.DummyPageModule),
    canActivate:[RestrictloginGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
