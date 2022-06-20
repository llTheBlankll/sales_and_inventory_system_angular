import { AfterViewInit, Component, Host, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category, Stock, Supplier } from 'src/app/entities';
import { RequesterService } from 'src/app/requester.service';
import { StocksComponent } from '../stocks.component';
import * as M from "materialize-css";

declare function activateSelectors(): any;

@Component({
  selector: 'app-modal-item-add',
  templateUrl: './modal-item-add.component.html',
  styleUrls: ['./modal-item-add.component.css']
})

export class ModalItemAddComponent implements OnInit, AfterViewInit {

  constructor(private requester: RequesterService, @Host() private stock: StocksComponent) { }

  // The form in front of the modal, you can totally see it.
  item_form: FormGroup = new FormGroup({
    productName: new FormControl("", Validators.required),
    productDescription: new FormControl("", Validators.required),
    productUnit: new FormControl("", Validators.required),
    productPrice: new FormControl("", Validators.required),
    productQuantity: new FormControl("", Validators.required),
    productStatus: new FormControl("", Validators.required),
    category_name: new FormControl("", Validators.required),
    supplier_name: new FormControl("", Validators.required)
  });

  // These two variables are for <selector> tags as they are used for <option> tag.
  all_categories: Category | any;
  all_suppliers: Supplier | any;

  ngOnInit(): void {
    // Load all Categories
    this.requester.getCategoryList().subscribe({
      next: data => {
        this.all_categories = data;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  ngAfterViewInit(): void {
    // Load all Suppliers
    this.requester.getSupplierList().subscribe({
      next: data => {
        this.all_suppliers = data;
      }
    })

    /*
    Load Selectors
    There is a delay because if the <selector> was loaded before the two variables
    then it won't display anything.
    */
    setTimeout(() => {
      activateSelectors();
    }, 2500);
  }

  addItem(): void {
    let item: Stock;

    // * Get Category by Name.
    this.requester.getCategoryByName(this.item_form.controls["category_name"].value).subscribe({
      next: category => {
        // * Get Supplier by Name.
        this.requester.getSupplierByName(this.item_form.controls["supplier_name"].value).subscribe({
          next: supplier => {
            item = {
              id: null,
              productName: this.item_form.controls["productName"].value,
              productDescription: this.item_form.controls["productDescription"].value,
              productPrice: this.item_form.controls["productPrice"].value,
              productQuantity: this.item_form.controls["productQuantity"].value,
              productStatus: this.item_form.controls["productStatus"].value,
              productUnit: this.item_form.controls["productUnit"].value,
              category: category,
              supplier: supplier,
              productOtherDetails: null
            };

            // Send the data to server.
            this.requester.addItem(item).subscribe({
              next: message => {
                /*
                Data was Received!
                Close the modal and send an alert to the user of the result
                and also refresh the table of the StockComponent.
                */
                // Reset the form after the creation of the new item.
                this.item_form.reset();
                this.close_modal();
                window.alert(message);
                this.stock.refreshStocksTable();
              },
              error: create_error => {
                console.error(create_error);
              }
            })
          },
          error: supplier_error => {
            console.error(supplier_error);
          }
        })
      },
      error: category_error => {
        console.error(category_error);
      }
    })
  }

  // Close this modal.
  close_modal(): void {
    $("#close_modal").trigger("click");
  }
}

