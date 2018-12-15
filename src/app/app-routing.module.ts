import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { QuestionanswerComponent } from './component/questionanswer/questionanswer.component';
import { PaymentcartComponent } from './component/paymentcart/paymentcart.component';

const appRoutes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardGuard] },
  { path: 'admin-questionanswer', component: QuestionanswerComponent },
  { path: '', component: AdminDashboardComponent, pathMatch: 'full', canActivate: [AuthGuardGuard] },
  { path: 'app-paymentcart', component: PaymentcartComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
