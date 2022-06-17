import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { StocksComponent } from './stocks/stocks.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const routes: Routes = [
  { path:"", redirectTo:"/dashboard", pathMatch:"full"},
  { path:"dashboard", component: DashboardComponent},
  { path:"dashboard/stocks", component: StocksComponent},
  { path:"dashboard/suppliers", component: SuppliersComponent},
  { path:"**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
