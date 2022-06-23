import { AfterViewInit, Component, Host, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stock, Category } from '../../entities';
import { RequesterService } from '../../requester.service';
import { StocksComponent } from '../stocks.component';
import * as M from 'materialize-css';

declare function activateSelectors(): any;
@Component({
  selector: 'app-modal-item-update',
  templateUrl: './modal-item-update.component.html',
  styleUrls: ['./modal-item-update.component.css'],
})
export class ModalItemUpdateComponent implements OnInit, AfterViewInit {
  constructor(private requester: RequesterService, @Host() private stock: StocksComponent) {}

  // Data provided by parent component of what item to update.
  @Input()
  item_data!: Stock;

  // The form in front of the modal (You can totally see it.)
  item_new_form: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
    productUnit: new FormControl('', Validators.required),
    productPrice: new FormControl('', Validators.required),
    productQuantity: new FormControl('', Validators.required),
    productStatus: new FormControl('', Validators.required),
    category_name: new FormControl('', Validators.required),
  });

  all_categories: Category | any;

  ngOnInit(): void {
    // Get all categories for the dropdown category in form.
    this.requester.getCategoryList().subscribe({
      next: (data) => {
        this.all_categories = data;
        // Reload Selectors.
        activateSelectors();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngAfterViewInit(): void {
    // Load all <selector> tags.
    activateSelectors();
  }

  convertFormToStock(item_new_form: FormGroup, category: Category): Stock {
    let item: Stock[] = [];

    // Assign the data collected from user and convert it into Stocks interface that can be used for updating the data.
    item.push({
      id: this.item_data.id,
      productName: this.item_new_form.controls['productName'].value,
      productDescription: this.item_new_form.controls['productDescription'].value,
      productUnit: this.item_new_form.controls['productUnit'].value,
      productPrice: this.item_new_form.controls['productPrice'].value,
      productQuantity: this.item_new_form.controls['productQuantity'].value,
      productStatus: this.item_new_form.controls['productStatus'].value,
      category: category,
      supplier: undefined,
      productOtherDetails: null,
    });
    
    return item[0];
  }

  updateItem() {
    // We will use this variable for sending the data to the API server.
    let item: Stock;

    // Get the category.
    this.requester.getCategoryByName(this.item_new_form.controls['category_name'].value).subscribe({
      next: (data) => {
        let item = this.convertFormToStock(this.item_new_form, data);

        // Request the data to be updated.
        this.requester.updateStock(item).subscribe({
          // If success, Close the modal.
          next: (data) => {
            // Show the results
            window.alert(data);

            // Reset the form to blank.
            this.item_new_form.reset();

            // Close the modal and refresh t he parent table.
            $("#close_modal").trigger("click");
            this.refreshStockTables();
          },
          error: (error) => {
            window.alert(error.error.text);
            this.item_new_form.reset();
            console.error(error);
          },
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Refresh the Stocks Table to the Parent Component (StocksComponent)
  refreshStockTables() {
    this.stock.refreshStocksTable();
  }
}
