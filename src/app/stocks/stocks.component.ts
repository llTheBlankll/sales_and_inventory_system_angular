import { Component, NgIterable, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Category, ItemData, Stock, StockWithPagination, Supplier } from '../entities';
import { RequesterService } from '../requester.service';

declare function activateModals(): any;

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit {

  item_placeholder: string = "";
  stockList!: Stock | any;
  low_stocks: Stock | any;
  no_stocks: Stock | any;

  // Item to be updated variables.
  updating_item_id: number = 0;
  updating_item_name: string = "";
  item_form!: Stock;

  search_form: FormGroup = new FormGroup({
    search_name: new FormControl("", Validators.required)
  });

  // Item to be deleted
  delete_item: ItemData | any;

  // Item Details to be sent to Item Details Component (Child)
  item_details!: Stock;

  // * Pagination numbers
  stock_paginations: any;
  current_page: number = 0;

  constructor(private requester: RequesterService) {
  }

  ngOnInit(): void {
    // Get Stock List Page 1.
    // NOTE: Page 1 starts at 0.
    this.requester.getStockListInPage(0).subscribe({
      next: data => {
        this.stockList = data;
      },
      error: error => {
        console.error(error);
      }
    });

    // Get Low Stock List.
    this.requester.getLowStockItems().subscribe({
      next: data => {
        this.low_stocks = data;
      },
      error: error => {
        console.error(error);
      }
    });

    // Get No Stock List.
    this.requester.getNoStockItems().subscribe({
      next: data => {
        this.no_stocks = data;
      },
      error: error => {
        console.error(error);
      }
    });

    // Load Pagination numbering
    // Page 1 starts at 0
    this.requester.stockPagination(0).subscribe({
      next: data => {
        let re = /\[|\]/gi;
        this.stock_paginations = data.replace(re, "").split(",")
      },
      error: error => {
        console.error(error);
      }
    });

    // Activate Modals.
    activateModals();
  }


  // * This will get called when the user pressed Search button.
  searchSubmit() {
    console.log(typeof (this.stock_paginations));
    console.log(this.stock_paginations);
  }

  setDeleteData(id: number | undefined | null, name: string) {
    this.delete_item = {
      item_id: id,
      item_name: name
    };
  }

  setUpdateForm(stock: Stock) {

    // Send the data to the update modal (Child)
    this.item_form = stock;
  }

  setItemDetails(stock: Stock) {
    this.item_details = stock;
  }

  getStockPage(pageNum: number) {
    // Get Stock List Page 1.
    // NOTE: Page 1 starts at 0.
    this.requester.getStockListInPage(pageNum).subscribe({
      next: data => {
        if (data.content.length > 0) {
          this.stockList = data;

          // Refresh the pagination below the table.
          // Load Pagination numbering
          // Page 1 starts at 0
          this.requester.stockPagination(pageNum).subscribe({
            next: data => {
              let re = /\[|\]/gi;
              if (data.replace(re, "").split(",").length >= 1) {
                this.stock_paginations = data.replace(re, "").split(",");
                this.current_page = pageNum;
              }
              // * Set the current page to 'pageNum';
              console.log(this.stock_paginations + " = " + this.current_page);
            },
            error: error => {
              console.error(error);
            }
          });
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }

  refreshStocksTable() {
    // Get Stock List.
    this.requester.getStockList().subscribe({
      next: data => {
        this.stockList = data;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  // Since the getting the starting value at first page is zero (0) in the rest api,
  // we can't say that the page is starting at 0 so we add 1 to the page num that displays in the pagination.
  // without this function the pagination below the table would be
  // * < 0 1 2 >
  // We need to remove that 0 and make it 1, so I added this used this function.
  // Now it is,
  // * < 1 2 3 >, More better.
  paginationIllusion(pageNum: string) {
    return parseInt(pageNum) + 1;
  }
}
