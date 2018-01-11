import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss']
})
export class EnquiriesComponent implements OnInit {

  @ViewChild('focusSetter') focusSetter: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
    .subscribe((event: any) => {
      console.log(`event: ${(event)}`);
      if (event instanceof NavigationEnd) {
        this.focusSetter.nativeElement.focus();
      }
    })
  }

}
