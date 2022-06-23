import { Component, Host, Input, OnInit } from '@angular/core';
import { ItemData } from '../../entities';
import * as M from 'materialize-css';
import { RequesterService } from '../../requester.service';
import { StocksComponent } from '../stocks.component';

@Component({
  selector: 'app-modal-item-delete',
  templateUrl: './modal-item-delete.component.html',
  styleUrls: ['./modal-item-delete.component.css'],
})
export class ModalItemDeleteComponent implements OnInit {
  constructor(private requester: RequesterService, @Host() private stock: StocksComponent) {}

  // Item Details.
  @Input()
  delete_item!: ItemData;

  ngOnInit(): void {}

  deleteItem(id: number) {

    // Request deletion of Item from the server.
    this.requester.deleteItem(id).subscribe({
      next: (data) => {
        // If success, refresh the table of the StockComponent and close the modal.
        this.stock.refreshStocksTable();
        
        // Close modal.
        $("#close_modal").trigger("click");
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
