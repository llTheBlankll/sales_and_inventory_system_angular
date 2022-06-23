import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ItemData, Stock } from '../entities';
import { RequesterService } from '../requester.service';

declare function activateModals(): any;

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit {

  item_placeholder: string = "";
  stockList!: Observable<any>
  // This variable is used for how 'many' items is below the quantity of (The configuration of the rest api (default: 10))
  low_stocks!: Observable<any>;
  // Stocks that has the quantity of 0
  no_stocks!: Observable<any>;

  /* 
  Item to be updated variables.
  These three variables are used for updating the item at Update Modal (modal-item-update component)
  */
  updating_item_id: number = 0;
  updating_item_name: string = "";
  item_form!: Stock;

  // Search form is the form above the <table>.
  search_form: FormGroup = new FormGroup({
    search_name: new FormControl("", Validators.required)
  });

  // Item to be deleted
  delete_item: ItemData | any;

  // Item Details to be sent to Item Details Component (Child)
  item_details!: Stock;

  // * Pagination numbers
  // Pagination is below the <table>.
  stock_paginations: any;
  current_page: number = 0;

  constructor(private requester: RequesterService) {
  }

  ngOnInit(): void {
    /*
    Get Stock List Page 1.
    NOTE: Page 1 starts at 0.
    */
    this.stockList = this.requester.getStockListInPage(0);

    // Get Low Stock List.
    this.low_stocks = this.requester.getLowStockItems();

    // Get No Stock List.
    this.no_stocks = this.requester.getNoStockItems();

    

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
    console.log("Getting Stocks at Page: " + pageNum);
    /* 
    Get Stock List Page 1.
    NOTE: Page 1 starts at 0.
     */
    this.requester.getStockListInPage(pageNum).subscribe({
      next: data => {
        if (data.length > 0) {
          this.stockList = of(data);

          /*
          Page 1 starts at 0
          Refresh the pagination below the table.
          */
          this.requester.stockPagination(pageNum).subscribe({
            next: data => {
              // The data that was received was a string ("[0,1,2]"),
              let re = /\[|\]/gi; // * This is used to remove the brackets.
              /*
              and make it an Array by splitting it with a delimiter of ",";
              this is not an Array so we will remove the brackets ('[]')
              */
              if (data.replace(re, "").split(",").length >= 1) {
                this.stock_paginations = data.replace(re, "").split(",");
                this.current_page = pageNum;
              }
              // * Set the current page to 'pageNum';
              console.log(data);
              console.log(this.stock_paginations + " = " + this.current_page);
            },
            error: error => {
              console.error(error);
            }
          });
        } else {
          console.log("You have reached the last Item")
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }

  // A function that will obtain the latest updated data
  // from the API Server
  refreshStocksTable() {
    // Get Stock List.
    this.stockList = this.requester.getStockListInPage(this.current_page);
  }

  /*
  we can't say that the page is starting at 0 so we add 1 to the page num that displays in the pagination. 
  without this function, the pagination below the table would be
  * < 0 1 2 >
  We need to remove that 0 and make it 1, so I added this and used it.
  Now it is,
  * < 1 2 3 >, More better, 
  but the value of that pagination to the backend is actually < 0 1 2 > because the page one starts at 0.
  Since getting the starting value on the first page is zero (0) in the rest API,
  */
  paginationIllusion(pageNum: string) {
    return parseInt(pageNum) + 1;
  }
}
