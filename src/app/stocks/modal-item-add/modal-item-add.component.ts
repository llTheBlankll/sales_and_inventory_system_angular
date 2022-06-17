import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/entities';
import { RequesterService } from 'src/app/requester.service';

declare function activateSelectors(): any;

@Component({
  selector: 'app-modal-item-add',
  templateUrl: './modal-item-add.component.html',
  styleUrls: ['./modal-item-add.component.css']
})

export class ModalItemAddComponent implements OnInit {

  constructor(private requester: RequesterService) { }

  item_form: FormGroup = new FormGroup({
      productName: new FormControl("", Validators.required),
      productDescription: new FormControl("", Validators.required),
      productUnit: new FormControl("", Validators.required),
      productPrice: new FormControl("", Validators.required),
      productQuantity: new FormControl("", Validators.required),
      productStatus: new FormControl("", Validators.required),
      category_name: new FormControl("", Validators.required),
  });

  all_categories!: Category | any;

  ngOnInit(): void {
    // Load all Categories
    this.requester.getCategoryList().subscribe({
      next: data => {
        this.all_categories = data;
        setTimeout(() => {
          activateSelectors();
        }, 5000)
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
