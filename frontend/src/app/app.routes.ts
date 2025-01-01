import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './components/home-layout-component/home-layout-component.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeLayoutComponent, // ------ the parent --------
    children: [
      { path: '', component: HomeComponent }, //---- Rendering HomeComponent inside the layout  ---
    ],
  },

  { path: 'login',component: LoginPageComponent },
  { path: 'register',component: RegisterPageComponent },
  { path: 'user-dashboard',component: UserDashboardComponent },
  { path: 'user-profil',component: UserProfilComponent },
  { path: 'create-user',component: CreateUserComponent},
  {  path:'admin-dashboard',component: AdminDashboardComponent}





];
