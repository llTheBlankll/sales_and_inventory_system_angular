import { Component, OnInit } from '@angular/core';
import { Supplier } from '../entities';
import { LoggerService } from '../logger.service';
import { RequesterService } from '../requester.service';

declare function activateModals(): any;

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  supplierList: Supplier | any;
  supplierData!: Supplier;

  constructor(private requester: RequesterService, private logger: LoggerService) { }

  ngOnInit(): void {
    this.loadSupplierTableContent();

    // Initialize Modals.
    activateModals();
  }

  loadSupplierTableContent() {
     // * Get Supplier List and display it to the table.
     this.requester.getSupplierList().subscribe({
      next: data => {
        this.supplierList = data;
      },
      error: error => {
        this.logger.errorLog(error);
      }
    });
  }

  // * Set the supplier_data variable for modifying supplier data for Modals like Update and Delete.
  setSupplierData(supplier: Supplier) { 
    this.supplierData = supplier;
  }
}
