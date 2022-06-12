import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stock, Category, Supplier } from '../entities';

@Component({
  selector: 'app-modal-item-update',
  templateUrl: './modal-item-update.component.html',
  styleUrls: ['./modal-item-update.component.css']
})
export class ModalItemUpdateComponent implements OnInit {

  constructor() { }

  @Input()
  new_item_data: Stock | undefined
  item_new_update_data: FormGroup = new FormGroup(
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

  ngOnInit(): void {
  }

  updateItem() {
    alert(JSON.stringify(this.item_new_update_data.value))
  }
}
