import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { PrincipalComponent } from './components/principal/principal.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductsPreviewComponent } from './components/products-preview/products-preview.component';
import { ConfirmSignComponent } from './components/confirm-sign/confirm-sign.component';

const routes: Routes = [
  {
    path: 'photos',
    component: PhotosListComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'photos/new',
    component: PhotoFormComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'photos/:id',
    component: PhotoPreviewComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'photos',
    component:PhotosListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signin',
    component: SigninComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch: 'full'
  }
  ,{
    path:'home',
    component:PrincipalComponent
  },
  {
    path:'forgot',
    component:ForgotPasswordComponent
  },
  {
    path:'reset/:token',
    component:ResetPasswordComponent
  },
  {
    path:'products/:id',
    component:ProductsPreviewComponent
  },
  {
    path:'confirm',
    component:ConfirmSignComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
