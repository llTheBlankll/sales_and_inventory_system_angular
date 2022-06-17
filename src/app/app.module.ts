import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { TopnavComponent } from './topnav/topnav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StocksComponent } from './stocks/stocks.component';
import { NgChartsModule } from 'ng2-charts';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { HttpClientModule } from "@angular/common/http";
import { ModalItemUpdateComponent } from './modal-item-update/modal-item-update.component';
import { ModalItemDeleteComponent } from './modal-item-delete/modal-item-delete.component';
import { ModalItemDetailsComponent } from './modal-item-details/modal-item-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    TopnavComponent,
    DashboardComponent,
    StocksComponent,
    SuppliersComponent,
    ModalItemUpdateComponent,
    ModalItemDeleteComponent,
    ModalItemDetailsComponent,
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
