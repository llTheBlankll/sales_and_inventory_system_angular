import { Component, NgIterable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { RequesterService } from '../requester.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private requester: RequesterService) { }

  categories!: Observable<any>;
  current_page = 0;
  categories_pagination!: NgIterable<any>;

  ngOnInit(): void {
    /*
Get the first page of Categories.
The size per page is dependent on the configuration of the server.
*/
    this.categories = this.requester.getCategoryListInPage(0);

    // Initialize Pagination
    this.requester.categoryPagination(0).subscribe({
      next: (pagination) => {
        let re = /\[|\]/gi;
        let data = pagination.replace(re, '').split(',');
        this.categories_pagination = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  setCategoryInPage(pageNum: number): void {
    this.requester.getCategoryListInPage(pageNum).subscribe({
      next: (categories) => {
        this.categories = of(categories);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  setCategoryPagination(pageNum: number): void {
    /* 
Set category and pagination in page 'pageNum'
NOTE: Page 1 starts at 0.
*/
    this.requester.getCategoryListInPage(pageNum).subscribe({
      next: (list) => {
        if (list.length > 0) {
          /*
  Page 1 starts at 0
  Refresh the pagination below the table.
  */
          this.requester.categoryPagination(pageNum).subscribe({
            next: (pagination) => {
              // The data that was received was a string ("[0,1,2]"),
              let re = /\[|\]/gi;
              let data = pagination.replace(re, '').split(',');

              /*
    and make it an Array by splitting it with a delimiter of ",";
    this is not an Array so we will remove the brackets ('[]')
    */
              if (data.length > 0) {
                this.categories_pagination = data;
              }
            },
            error: (err) => {
              console.error(err);
            },
          });
        } else {
          console.info('You have already reached the last category.');
        }
      },
    });
  }

  /*
we can't say that the page is starting at 0 so we add 1 to the page num that displays in the pagination. 
without this function, the pagination below the table would be
* < 0 1 2 >
We need to remove that 0 and make it 1, so I added this and used it.
Now it is,
* < 1 2 3 >, More better, 
but the value of that pagination to the backend is actually < 0 1 2 > because the page one starts at 0.
Since getting the starting value on the first page is zero (0) in the rest API,
*/
  paginationIllusion(pageNum: string) {
    return parseInt(pageNum) + 1;
  }
}
