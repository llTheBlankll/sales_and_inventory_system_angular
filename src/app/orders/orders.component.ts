import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var elems = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(elems);
  }

}
