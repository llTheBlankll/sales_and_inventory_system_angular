import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Stock, Supplier, Category, ItemData, StockWithPagination } from './entities';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class RequesterService {

  total: any;

  constructor(private httpclient: HttpClient, private logger: LoggerService ) { }

  base_url: string = "http://localhost:8080/api";

  // * SUPPLIER SEPARATION STARTED.

  // Get all supplier list.
  getSupplierList(): Observable<Supplier> {
    return this.httpclient.get<Supplier>(this.base_url + "/suppliers/all");
  }

  getSupplierListInPage(pageNum: number): Observable<any> {
    return this.httpclient.get(this.base_url + "/suppliers/all/" + pageNum);
  }

  deleteSupplier(supplier: Supplier) {
    // Return the message with a type of string.
    return this.httpclient.delete(this.base_url + "/suppliers/delete", { responseType: "text", body: supplier });
  }

  addSupplier(supplier: Supplier) {
    return this.httpclient.put(this.base_url + "/suppliers/add", supplier, { responseType: "text" });
  }

  getSupplierByName(name: string): Observable<Supplier> {
    return this.httpclient.get<Supplier>(this.base_url + "/suppliers/by_name?supplier_name=" + name);
  }

  getSupplierPagination(pageNum: number): Observable<string> {
    return this.httpclient.get(this.base_url + "/pagination/suppliers/" + pageNum, { responseType: "text" });
  }

  // ! SUPPLIER FUNCTIONS END HERE.
  // * STOCK/ITEMS FUNCTIONS STARTED HERE.

  // Get all stock list.
  getStockList(): Observable<any> {
    return this.httpclient.get<any>(this.base_url + "/stocks/all");
  }

  getStockListInPage(pageNum: number): Observable<any> {
    // * Page 1 starts at 0.
    return this.httpclient.get<any>(this.base_url + "/stocks/all/" + pageNum);
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

  updateStock(data: Stock) {
    return this.httpclient.put<Stock>(this.base_url + "/stocks/add", data)
  }

  deleteItem(id: number) {
    return this.httpclient.delete(this.base_url + "/stocks/delete/" + id);
  }

  addItem(item: Stock) {
    // Returns string for the message
    return this.httpclient.put(this.base_url + "/stocks/add", item, {responseType: "text"});
  }

  stockPagination(pageNum: number): Observable<string> {
    return this.httpclient.get(this.base_url + "/pagination/stocks/" + pageNum, {responseType: "text"});
  }

  // ! STOCK/ITEM FUNCTIONS END HERE.
  // * CATEGORIES FUNCTIONS STARTED HERE!

  // Get all categories in the database.
  getCategoryList(): Observable<Category> {
    return this.httpclient.get<Category>(this.base_url + "/categories/all");
  }

  getCategoryListInPage(pageNum: number): Observable<any> {
    return this.httpclient.get<Category>(this.base_url + "/categories/all/" + pageNum);
  }

  getCategoryByName(name: string): Observable<Category> {
    return this.httpclient.get<Category>(this.base_url + "/categories/by_name?name=" + name);
  }
  
  addCategory(category: Category): Observable<any> {
    return this.httpclient.put(this.base_url + "/categories/add", category, { responseType: "text"});
  }

  deleteCategory(category: Category): Observable<any> {
    return this.httpclient.delete(this.base_url + "/categories/delete", { body: category, responseType: "text" });
  }

  updateCategory(category: Category): Observable<any> {
    return this.httpclient.put(this.base_url + "/categories/update", category, { responseType: "text"});
  }

  categoryPagination(pageNum: number): Observable<string> {
    return this.httpclient.get(this.base_url + "/pagination/categories/" + pageNum, { responseType: "text" });
  }

  //! CATEGORY FUNCTIONS END HERE.
}
