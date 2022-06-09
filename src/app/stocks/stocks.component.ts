import { Component, OnInit } from '@angular/core';
import { Stock } from '../entities';
import { RequesterService } from '../requester.service';

declare function activateModals(): any;

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})


export class StocksComponent implements OnInit {

  item_placeholder: string = "";
  stockList: Stock | any;
  low_stocks: Stock | any;
  no_stocks: Stock | any;

  // Item to be updated variables.
  updating_item_id: number = 0;
  updating_item_name: string = "";

  constructor(private requester: RequesterService) {
  }

  ngOnInit(): void {
    // Get Stock List.
    this.requester.getStockList().subscribe({
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

    // Activate Modals.
    activateModals();
  }

  
  // * This will get called when the user pressed Search button.
  searchSubmit() {
    
  }

  // * This will get called when the user clicked on Update link in one of the row in the table.
  setUpdatingItemName(id: number) {
    for (let stock of this.stockList) {
      if (stock.id == id) {
        this.updating_item_id = stock.id;
        this.updating_item_name = stock.productName;
        break;
      }
    }

    console.log("Updating item " + this.updating_item_name + " with an ID of " + this.updating_item_id)
  }
}
