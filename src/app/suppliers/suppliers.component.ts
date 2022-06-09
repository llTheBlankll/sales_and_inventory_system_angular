import { Component, OnInit } from '@angular/core';
import { Supplier } from '../entities';
import { LoggerService } from '../logger.service';
import { RequesterService } from '../requester.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  supplierList: Supplier | any;

  constructor(private requester: RequesterService, private logger: LoggerService) { }

  ngOnInit(): void {
    this.requester.getSupplierList().subscribe({
      next: data => {
        this.supplierList = data;
      },
      error: error => {
        this.logger.errorLog(error);
      }
    })
  }

}
