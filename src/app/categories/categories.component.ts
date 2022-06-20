import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from '../entities';
import { RequesterService } from '../requester.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  constructor(private requester: RequesterService) { }
  
  categories!: Observable<any>;
  current_page = 0;

  ngOnInit(): void {
    this.categories = this.requester.getCategoryListAtPage(0);
  }

  ngAfterViewInit(): void {
    
  }
}
