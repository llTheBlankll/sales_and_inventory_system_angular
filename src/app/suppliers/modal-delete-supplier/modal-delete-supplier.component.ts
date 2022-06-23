import { Component, Host, Input, OnInit } from '@angular/core';
import { Supplier } from 'src/app/entities';
import { RequesterService } from 'src/app/requester.service';
import { SuppliersComponent } from '../suppliers.component';

@Component({
  selector: 'app-modal-delete-supplier',
  templateUrl: './modal-delete-supplier.component.html',
  styleUrls: ['./modal-delete-supplier.component.css'],
})
export class ModalDeleteSupplierComponent implements OnInit {
  constructor(
    private requester: RequesterService,
    @Host() private supplierComponent: SuppliersComponent
  ) {}

  @Input()
  supplier_data!: Supplier;

  ngOnInit(): void {}

  // * Deleting the supplier.
  deleteSupplier(): void {
    // * Request the data to be deleted.
    this.requester.deleteSupplier(this.supplier_data).subscribe({
      next: (data) => {
        window.alert(data);
        this.supplierComponent.loadSupplierTableContent();
        this.close_modal();
      },
      error: (delete_failed) => {
        window.alert('Cannot delete supplier.');
        console.error(delete_failed);
      },
    });
  }

  // * Closing the this modal.
  close_modal(): void {
    M.Modal.init(document.getElementById('delete_supplier') as HTMLElement).close();
  }
}
