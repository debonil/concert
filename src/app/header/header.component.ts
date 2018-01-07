import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() themeIn: string;
  @Output() themeOut = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
