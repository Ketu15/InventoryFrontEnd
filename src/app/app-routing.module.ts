import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { SignupComponent } from './User/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { ListProductsComponent } from './Product/list-products/list-products.component';
import { UpdateProductComponent } from './Product/update-product/update-product.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'list-product', component: ListProductsComponent, canActivate: [AuthGuard] },
  { path: 'update-product/:id', component: UpdateProductComponent, canActivate: [AuthGuard] },
  // Other routes
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirect to login by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
