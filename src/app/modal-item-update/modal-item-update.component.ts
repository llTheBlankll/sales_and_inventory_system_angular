import { Component, Host, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stock, Category} from '../entities';
import { RequesterService } from '../requester.service';
import { StocksComponent } from '../stocks/stocks.component';
import * as M from "materialize-css";

declare function activateSelectors(): any;
@Component({
  selector: 'app-modal-item-update',
  templateUrl: './modal-item-update.component.html',
  styleUrls: ['./modal-item-update.component.css']
})


export class ModalItemUpdateComponent implements OnInit {

  constructor(private requester: RequesterService, @Host() private stock: StocksComponent) { 
  }


  @Input()
  item_data!: Stock;
  item_new_form: FormGroup = new FormGroup(
    {
      productName: new FormControl("", Validators.required),
      productDescription: new FormControl("", Validators.required),
      productUnit: new FormControl("", Validators.required),
      productPrice: new FormControl("", Validators.required),
      productQuantity: new FormControl("", Validators.required),
      productStatus: new FormControl("", Validators.required),
      category_name: new FormControl("", Validators.required),
    }
  );
  item: Stock[] = [];

  all_categories: Category | any;

  ngOnInit(): void {
    // Get all categories for the dropdown category in form.
    this.requester.getCategoryList().subscribe({
      next: data => {
        this.all_categories = data;
        setTimeout(() => {
          activateSelectors();
        }, 500)
      },
      error: error => {
        console.error(error);
      }
    });
  }

  updateItem() {
    // Get the category.
    this.requester.getCategoryByName(this.item_new_form.controls["category_name"].value).subscribe({
      next: data => {
        this.item.push({
          id: this.item_data.id,
          productName: this.item_new_form.controls["productName"].value,
          productDescription: this.item_new_form.controls["productDescription"].value,
          productUnit: this.item_new_form.controls["productUnit"].value,
          productPrice: this.item_new_form.controls["productPrice"].value,
          productQuantity: this.item_new_form.controls["productQuantity"].value,
          productStatus: this.item_new_form.controls["productStatus"].value,
          category: data,
          productOtherDetails: null,
          supplier: undefined
        })

        this.requester.updateStock(this.item[0]).subscribe({
          next: data => {
            let close_modal = new M.Modal(document.getElementById("update_item")!);
            close_modal.close();
            this.refreshStockTables();
          },
          error: error => {
            console.error(error);
          }
        })
      },
      error: error => {
        console.error(error);
      }
    });
  }

  refreshStockTables() {
    this.stock.refreshStocksTable();
  }
}
