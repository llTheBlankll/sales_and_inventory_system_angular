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
import { ModalItemDeleteComponent } from './stocks/modal-item-delete/modal-item-delete.component';
import { ModalItemDetailsComponent } from './stocks/modal-item-details/modal-item-details.component';
import { ModalItemUpdateComponent } from './stocks/modal-item-update/modal-item-update.component';
import { ModalItemAddComponent } from './stocks/modal-item-add/modal-item-add.component';
import { ModalDeleteSupplierComponent } from './suppliers/modal-delete-supplier/modal-delete-supplier.component';
import { ModalUpdateSupplierComponent } from './suppliers/modal-update-supplier/modal-update-supplier.component';
import { ModalAddSupplierComponent } from './suppliers/modal-add-supplier/modal-add-supplier.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    TopnavComponent,
    DashboardComponent,
    StocksComponent,
    SuppliersComponent,
    ModalItemDeleteComponent,
    ModalItemDetailsComponent,
    ModalItemUpdateComponent,
    ModalItemAddComponent,
    ModalDeleteSupplierComponent,
    ModalUpdateSupplierComponent,
    ModalAddSupplierComponent
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
