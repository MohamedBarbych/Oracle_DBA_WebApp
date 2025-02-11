import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './components/home-layout-component/home-layout-component.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { FailurePageComponent } from './components/failure-page/failure-page.component';
import { DeleteUserPageComponent } from './components/delete-user-page/delete-user-page.component';
import { UpdateUserComponent } from  './components/update-user/update-user.component';
import {OptimizationComponent} from './components/optimization/optimization.component';
import { BackupComponent} from './components/backup/backup.component';
import { AssignRoleComponent } from './components/asign-role/asign-role.component';
import { SetQuotaComponent } from './components/set-quota/set-quota.component';
import { CreateTableSpaceComponent } from './components/create-table-space/create-table-space.component';
import { PerformanceDashComponent } from './components/performance-dash/performance-dash.component';
import { ResourceUsageComponent } from './components/resource-usage/resource-usage.component';
import { ASHReportComponent } from './components/ash-report/ash-report.component';
import { AwrReportComponent } from './components/awr-report/awr-report.component';
import { SecurityComponent } from './components/security/security.component';
import { ParticulesComponent } from './components/shared/particules/particules.component';
import { UserDashComponent } from './components/user-dash/user-dash.component';

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
  { path: 'user-management',component: UserDashboardComponent },
  { path: 'user-profil',component: UserProfilComponent },
  { path: 'create-user',component: CreateUserComponent},
  { path:'admin-dashboard',component: AdminDashboardComponent},
  { path:'success-page',component: SuccessPageComponent},
  { path:'failure-page',component: FailurePageComponent},
  { path:'delete-user',component: DeleteUserPageComponent },
  { path:'update-user',component: UpdateUserComponent },
  { path: 'optimization', component: OptimizationComponent },
  { path: 'backup', component: BackupComponent },



  { path:'update-user',component: UpdateUserComponent },
  { path: 'asign-role',component: AssignRoleComponent },
  { path: 'Set-Quota',component: SetQuotaComponent },
  { path: 'create-tablespace',component: CreateTableSpaceComponent },
  { path: 'Performance-Dash',component: PerformanceDashComponent },
  { path:'Resource-Usage',component: ResourceUsageComponent },
  { path: 'ASH-Report',component: ASHReportComponent },
  { path:'Awr-report',component: AwrReportComponent },
  { path:'Security',component: SecurityComponent },

  { path:'user-dash',component: UserDashComponent }
];









