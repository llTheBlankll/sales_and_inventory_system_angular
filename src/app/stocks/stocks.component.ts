import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, ItemData, Stock, Supplier } from '../entities';
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
  
  search_form: FormGroup = new FormGroup({
    search_name: new FormControl("", Validators.required)
  });
  
  // Item to be deleted
  delete_item: ItemData | any;

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

  setDeleteData(id: number, name: string) {
    this.delete_item = {
      item_id: id,
      item_name: name
    };
  }

  setUpdateForm(id: number, name: string, description: string,
     unit: string, price: number, quantity: number,
      category: Category, status: string, other_details: string, 
      supplier: Supplier) {

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
}
