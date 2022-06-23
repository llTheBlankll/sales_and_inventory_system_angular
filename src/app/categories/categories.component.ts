import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RequesterService } from '../requester.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private requester: RequesterService) { }

  categories!: Observable<any>;
  current_page = 0;

  ngOnInit(): void {
    /*
    Get the first page of Categories.
    The size per page is dependent to the configuration of the server.
    */
    this.categories = this.requester.getCategoryListAtPage(0);
  }
}
