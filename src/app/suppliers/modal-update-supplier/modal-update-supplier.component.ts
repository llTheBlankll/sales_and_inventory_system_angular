import { Component, Host, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/entities';
import { RequesterService } from 'src/app/requester.service';
import { SuppliersComponent } from '../suppliers.component';

@Component({
  selector: 'app-modal-update-supplier',
  templateUrl: './modal-update-supplier.component.html',
  styleUrls: ['./modal-update-supplier.component.css'],
})
export class ModalUpdateSupplierComponent implements OnInit {
  constructor(private requester: RequesterService, @Host() private suppliersComponent: SuppliersComponent) {}

  @Input()
  supplier_data!: Supplier;

  supplier_form: FormGroup = new FormGroup(
    {
      name: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      fax: new FormControl(""),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email]))
    }
  );

  ngOnInit(): void {}

  convertFormToSupplier(formGroup: FormGroup): Supplier {
    let data: Supplier[] = [];
    data.push(
      {
        supplierName: formGroup.controls["name"].value,
        supplierAddress: formGroup.controls["address"].value,
        supplierPhone: formGroup.controls["phone"].value,
        supplierFax: formGroup.controls["fax"].value,
        supplierEmail: formGroup.controls["email"].value,
        id: this.supplier_data.id,
        supplierOtherDetails: null
      }
    );

    return data[0];
  }

  submit(): void {
    let supplier: Supplier = this.convertFormToSupplier(this.supplier_form);
    this.requester.updateSupplier(supplier).subscribe(
      {
        next: result => {
          window.alert(result);
          console.log(result);
          this.supplier_form.reset();
          this.close_modal();

          // Refresh the supplier table.
          this.suppliersComponent.setSupplierDataInPage(this.suppliersComponent.current_page);
        },
        error: err => {
          window.alert(err.error.text);
          this.supplier_form.reset();
          console.error(err);
        }
      }
    );
  }

  close_modal(): void {
    $("#close_modal").trigger("click");
  }
}
