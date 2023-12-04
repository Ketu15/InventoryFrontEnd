import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { SignupComponent } from './User/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { ListProductsComponent } from './Product/list-products/list-products.component';
import { UpdateProductComponent } from './Product/update-product/update-product.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },

  { path: 'dashboard', component: DashboardComponent }, 
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'add-product', component: AddProductComponent },
  { path: 'list-product', component: ListProductsComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  //{ path: 'sidebar', component: SidebarComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
