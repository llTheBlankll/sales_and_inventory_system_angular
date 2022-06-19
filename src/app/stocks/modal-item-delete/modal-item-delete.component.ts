import { Component, Host, Input, OnInit } from '@angular/core';
import { ItemData } from '../../entities';
import * as M from "materialize-css";
import { RequesterService } from '../../requester.service';
import { StocksComponent } from '../stocks.component';

@Component({
  selector: 'app-modal-item-delete',
  templateUrl: './modal-item-delete.component.html',
  styleUrls: ['./modal-item-delete.component.css']
})

export class ModalItemDeleteComponent implements OnInit {

  constructor(private requester: RequesterService, @Host() private stock: StocksComponent) { }

  // Item Details.
  @Input()
  delete_item!: ItemData;

  ngOnInit(): void {
  }

  deleteItem(id: number) {
    // Get Modal Instance
    let close_modal = new M.Modal(document.getElementById("delete_item") as HTMLElement);
    
    // Request deletion of Item from the server.
    this.requester.deleteItem(id).subscribe({
      next: data => {
        // If success, refresh the table of the StockComponent and close the modal.
        this.stock.refreshStocksTable();
        close_modal.close();
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
