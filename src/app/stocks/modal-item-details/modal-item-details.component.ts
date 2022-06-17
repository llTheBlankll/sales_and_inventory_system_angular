import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../entities';

@Component({
  selector: 'app-modal-item-details',
  templateUrl: './modal-item-details.component.html',
  styleUrls: ['./modal-item-details.component.css']
})
export class ModalItemDetailsComponent implements OnInit {

  constructor() {
  }

  @Input()
  item_details!: Stock;

  ngOnInit(): void {

  }

}
