import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { TopnavComponent } from './topnav/topnav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StocksComponent } from './stocks/stocks.component';
import { SalesComponent } from './sales/sales.component';
import { NgChartsModule } from 'ng2-charts';
import { OrdersComponent } from './orders/orders.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { HttpClientModule } from "@angular/common/http";
import { ModalItemUpdateComponent } from './modal-item-update/modal-item-update.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    TopnavComponent,
    DashboardComponent,
    StocksComponent,
    SalesComponent,
    OrdersComponent,
    SuppliersComponent,
    ModalItemUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
