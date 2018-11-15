import { NgModule } from '@angular/core';
import{ RouterModule, Routes} from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard';

const appRoutes: Routes=[
  {path:'admin-login',component:AdminLoginComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AuthGuardGuard] },
  {path:'',component:AdminDashboardComponent,pathMatch:'full',canActivate:[AuthGuardGuard]},
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)

  ],
  exports:[ RouterModule]
})
export class AppRoutingModule { }