import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { concat } from 'rxjs/operator/concat';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currZoom: number = 1.0;

  @Input() themeIn: string;
  @Output() themeOut = new EventEmitter();
  @Output() logOut = new EventEmitter();

  dialogRef: any;

  constructor(public router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    document.getElementsByTagName('html')[0].style.fontSize = '1.0rem';
  }

  incFontSize() {
    let fs = document.getElementsByTagName('html')[0].style.fontSize;
    fs = fs.substring(0, fs.length - 3);
    const fsn: number = Number(fs) + 0.1;
    console.log('fsn: ' + fsn);
    if (fsn <= 1.4) {
      document.getElementsByTagName('html')[0].style.fontSize = fsn + 'rem';
    }
  }
  decFontSize() {
    let fs = document.getElementsByTagName('html')[0].style.fontSize;
    fs = fs.substring(0, fs.length - 3);
    const fsn: number = Number(fs) - 0.1;
    console.log('fsn: ' + fsn);
    if (fsn >= 0.6) {
      document.getElementsByTagName('html')[0].style.fontSize = fsn + 'rem';
    }
  }

  zoomIn() {
    if (this.currZoom <= 1.2) {
      this.currZoom += 0.1;
      const bodyElement: HTMLElement = <HTMLElement>document.getElementsByTagName('BODY')[0];
      bodyElement.style.zoom = this.currZoom.toString();
    }
  }
  zoomOut() {
    if (this.currZoom >= 0.9) {
      this.currZoom -= 0.1;
      const bodyElement: HTMLElement = <HTMLElement>document.getElementsByTagName('BODY')[0];
      bodyElement.style.zoom = this.currZoom.toString();
    }
  }
}
