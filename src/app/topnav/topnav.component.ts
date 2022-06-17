import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from '../logger.service'

interface Link {
  href: string,
  text: string
}

declare function refreshDatePicker(): any;
declare function activateDropdowns(): any;

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})

export class TopnavComponent implements OnInit {

  constructor(private router: ActivatedRoute, private logger: LoggerService) {
  }

  // Links to be displayed in the Top navigation.
  links: Link[] = [
    {
      href: "/dashboard",
      text: "Home",
    },
    {
      href: "/dashboard/stocks",
      text: "Stocks"
    },
    {
      href: "/dashboard/suppliers",
      text: "Suppliers"
    }
  ];

  // example: 'dashboard'
  current_url: string = "";

  ngOnInit(): void {
    // Current URL.
    this.router.snapshot.url.map(url => {
      this.current_url = url.path;
    })

    // For debugging, to know where you are.
    this.logger.Log(this.current_url);

    // Initialize Dropdowns and Datepicker if there is one.
    refreshDatePicker();
    activateDropdowns();
  }

}
