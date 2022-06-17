import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Stock } from '../entities';
import { RequesterService } from '../requester.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // On Startup dashboard display data.
  inventory_value: string | undefined;
  low_stocks: Stock | any;
  no_stocks: Stock | any;


  constructor(private requester: RequesterService) { }

  lineChartType: ChartType = "line";

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [291, 982, 1891, 1000, 4000, 3000, 50000],
        label: "Sales"
      },
      {
        data: [0, 920, 1251, 2015, 3121, 4031, 10000],
        label: "Money"
      }
    ],
    labels: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
  };

  public lineChartOption: ChartConfiguration["options"] = {
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Active Products"
      }
    },
    responsive: true,
    elements: {
      line: {
        tension: 0.25
      }
    }
  }

  ngOnInit(): void {
    // Get Inventory Value.
    this.requester.getInventoryValue().subscribe({
      next: data => {
        this.inventory_value = Number(data).toLocaleString();
      },
      error: error => {
        console.error(error);
      }
    });

    // Get Low Stocks Items.
    this.requester.getLowStockItems().subscribe({
      next: data => {
        this.low_stocks = data;
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
