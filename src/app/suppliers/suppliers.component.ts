import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
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

  supplierList!: Observable<any>;
  supplierData!: Observable<any>;

  constructor(private requester: RequesterService, private logger: LoggerService) { }

  // Page 1 starts at 0.
  current_page: number = 0;

  pagination: any;

  ngOnInit(): void {
    this.loadSupplierTableContent();

    // Initialize Modals.
    activateModals();

    
  }

  loadSupplierTableContent() {
     // * Get Supplier List and display it to the table.
     this.requester.getSupplierListInPage(0).subscribe({
      next: data => {
        this.supplierList = of(data);
      },
      error: error => {
        this.logger.errorLog(error);
      }
    });
  }

  // * Set the supplier_data variable for modifying supplier data for Modals like Update and Delete.
  setSupplierData(supplier: Supplier) { 
    this.supplierData = of(supplier);
  }

  setSupplierDataInPage(pageNum: number): void {
    console.log("Getting Stocks at Page: " + pageNum);
    /* 
    Get Stock List Page 1.
    NOTE: Page 1 starts at 0.
     */
    this.requester.getSupplierListInPage(pageNum).subscribe({
      next: data => {
        if (data.length > 0) {
          this.supplierList = of(data);

          /*
          Page 1 starts at 0
          Refresh the pagination below the table.
          */
          this.requester.getSupplierPagination(pageNum).subscribe({
            next: data => {
              // The data that was received was a string ("[0,1,2]"),
              let re = /\[|\]/gi; // * This is used to remove the brackets.
              /*
              and make it an Array by splitting it with a delimiter of ",";
              this is not an Array so we will remove the brackets ('[]')
              */
              if (data.replace(re, "").split(",").length >= 1) {
                this.pagination = data.replace(re, "").split(",");
                this.current_page = pageNum;
              }
              // * Set the current page to 'pageNum';
              console.log(data);
              console.log(this.pagination + " = " + this.current_page);
            },
            error: error => {
              console.error(error);
            }
          });
        } else {
          console.log("You have reached the last Item");
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }

  /*
  we can't say that the page is starting at 0 so we add 1 to the page num that displays in the pagination. 
  without this function, the pagination below the table would be
  * < 0 1 2 >
  We need to remove that 0 and make it 1, so I added this and used this function.
  Now it is,
  * < 1 2 3 >, More better, but the value of that pagination to the backend is
  actually < 0 1 2 > because the page one starts at 0.
  Since the getting the starting value on the first page is zero (0) in the rest API,
  */
  paginationIllusion(pageNum: string) {
    return parseInt(pageNum) + 1;
  }
}
