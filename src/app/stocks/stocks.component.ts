import { Component, OnInit } from '@angular/core';
import { Category, Stock, Supplier } from '../entities';
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
  item_form!: Stock;

  load_update_modal: boolean = false;

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

  setUpdateForm(id: number, name: string, description: string,
     unit: string, price: number, quantity: number,
      category: Category, status: string, other_details: string, 
      supplier: Supplier) {
      
    // Load Update Modal.
    this.load_update_modal = true;

    // Send the data to the update modal (Child)
    this.item_form = {
      id: id,
      productName: name,
      productDescription: description,
      productUnit: unit,
      productPrice: price,
      productQuantity: quantity,
      productStatus: status,
      category: category,
      productOtherDetails: other_details,
      supplier: supplier
    };
  }
}
