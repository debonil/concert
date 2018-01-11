import { Component, OnInit } from '@angular/core';
import * as appconfig from '../../../environments/appconfig';

@Component({
  selector: 'app-enquiries-menu',
  templateUrl: './enquiries-menu.component.html',
  styleUrls: ['./enquiries-menu.component.scss']
})
export class EnquiriesMenuComponent implements OnInit {

  enquiriesList = appconfig.enquiriesList;
  constructor() {
  }

  ngOnInit() {
  }

  numToChar(i: number): string {
    return String.fromCharCode(i);
  }

}
