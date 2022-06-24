import { Component, OnInit } from '@angular/core';
import { Stock } from '../entities';
import { RequesterService } from '../requester.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // On Startup dashboard display data.
  inventory_value: string | undefined;
  low_stocks: Stock | any;
  no_stocks: Stock | any;

  constructor(private requester: RequesterService) {}

  ngOnInit(): void {
    // Get Inventory Value.
    this.requester.getInventoryValue().subscribe({
      next: (data) => {
        this.inventory_value = Number(data).toLocaleString();
      },
      error: (error) => {
        console.error(error);
      },
    });

    // Get Low Stocks Items.
    this.requester.getLowStockItems().subscribe({
      next: (data) => {
        this.low_stocks = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
