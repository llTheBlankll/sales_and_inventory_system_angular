import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from '../logger.service';

interface Link {
  href: string;
  text: string;
}

declare function activateDropdowns(): any;

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent implements OnInit {
  constructor(private router: ActivatedRoute, private logger: LoggerService) {}

  // Links to be displayed in the Top navigation.
  links: Link[] = [
    {
      href: '/dashboard',
      text: 'Home',
    },
    {
      href: '/dashboard/stocks',
      text: 'Stocks',
    },
    {
      href: '/dashboard/suppliers',
      text: 'Suppliers',
    },
    {
      href: '/dashboard/categories',
      text: 'Categories',
    },
  ];

  // example: 'dashboard'
  current_url: string = '';

  NumberLocaleString(value: number) {
    return Number(value).toLocaleString();
  }

  ngOnInit(): void {
    this.current_url = this.router.snapshot.url.toString();

    // Activate Links Dropdowns
    activateDropdowns();
    
    // For debugging, to know where you are.
    this.logger.Log(this.current_url);
  }
}
