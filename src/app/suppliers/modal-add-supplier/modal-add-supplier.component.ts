import { Component, Host, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Supplier } from 'src/app/entities';
import { RequesterService } from 'src/app/requester.service';
import { SuppliersComponent } from '../suppliers.component';

@Component({
  selector: 'app-modal-add-supplier',
  templateUrl: './modal-add-supplier.component.html',
  styleUrls: ['./modal-add-supplier.component.css'],
})
export class ModalAddSupplierComponent implements OnInit {
  constructor(private requester: RequesterService, @Host() private suppliersComponent: SuppliersComponent) {}

  supplier_form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    fax: new FormControl(''),
    email: new FormControl('', Validators.required),
    other_details: new FormControl(''),
  });

  ngOnInit(): void {}

  // * This is called when the form was successfully filled and submitted.
  addSupplier(): void {
    // * Set the data required by the variable.
    let supplier: Supplier = {
      id: undefined,
      supplierName: this.supplier_form.controls['name'].value,
      supplierAddress: this.supplier_form.controls['address'].value,
      supplierPhone: this.supplier_form.controls['phone'].value,
      supplierFax: this.supplier_form.controls['fax'].value,
      supplierEmail: this.supplier_form.controls['email'].value,
      supplierOtherDetails: this.supplier_form.controls['other_details'].value,
    };
    // * Send the data to the server.
    this.requester.addSupplier(supplier).subscribe({
      next: (message) => {
        window.alert(message);
        this.close_modal();
        this.suppliersComponent.loadSupplierTableContent();
        this.supplier_form.reset();
      },
      error: (error) => {
        console.error(error);
        window.alert('Cannot add supplier. An error occurred.');
        this.supplier_form.reset();
      },
    });
  }

  close_modal(): void {
    $("#close_modal").trigger("click");
  }
}
