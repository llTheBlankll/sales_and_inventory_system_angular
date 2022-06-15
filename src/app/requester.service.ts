import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Stock, Supplier, Category } from './entities';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class RequesterService {

  total: any;

  constructor(private httpclient: HttpClient, private logger: LoggerService ) { }

  base_url: string = "http://localhost:8080/api";


  // Get all stock list.
  getStockList(): Observable<Stock> {
    return this.httpclient.get<Stock>(this.base_url + "/stocks");
  }

  // Get all supplier list.
  getSupplierList(): Observable<Supplier> {
    return this.httpclient.get<Supplier>(this.base_url + "/suppliers");
  }

  // Get all categories in the database.
  getCategoryList(): Observable<Category> {
    return this.httpclient.get<Category>(this.base_url + "/categories");
  }

  // Get the total value of the entire inventory.
  getInventoryValue(): Observable<any> {
    return this.httpclient.get(this.base_url + "/stocks/total_value");
  }

  // Get Low Stock Items.
  getLowStockItems(): Observable<Stock> {
    return this.httpclient.get<Stock>(this.base_url + "/stocks/low_stock");
  }

  // Get Items with no Stock left.
  getNoStockItems(): Observable<Stock> {
    return this.httpclient.get<Stock>(this.base_url + "/stocks/no_stock");
  }

  getCategoryByName(name: string): Observable<Category> {
    return this.httpclient.get<Category>(this.base_url + "/categories/by_name?name=" + name);
  }

  getSupplierByName(name: string): Observable<Supplier> {
    return this.httpclient.get<Supplier>(this.base_url + "/suppliers/by_name?supplier_name=" + name);
  }

  updateStock(data: Stock) {
    return this.httpclient.put<Stock>(this.base_url + "/stocks/add", data=data)
  }
}
