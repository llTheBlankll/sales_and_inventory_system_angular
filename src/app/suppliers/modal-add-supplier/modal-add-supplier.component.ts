import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-add-supplier',
  templateUrl: './modal-add-supplier.component.html',
  styleUrls: ['./modal-add-supplier.component.css']
})
export class ModalAddSupplierComponent implements OnInit {

  constructor() { }

  supplier_form: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    fax: new FormControl(""),
    email: new FormControl("", Validators.required),
    other_details: new FormControl("")
  });

  ngOnInit(): void {
  }

}
