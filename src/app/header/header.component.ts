import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() themeIn: string;
  @Output() themeOut = new EventEmitter();

  dialogRef: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(ThemeDialogComponent, {
      // width: '8.5rem',
      data: { theme: this.themeIn }
    });
    // dialogRef.updatePosition({ top: '50px', right: '10px' });
    this.dialogRef.afterClosed().subscribe(theme => {
      console.log('The dialog was closed' + theme);
      if (theme !== undefined) {
        this.themeOut.emit(theme);
      }
    });
  }
}

@Component({
  selector: 'app-theme-dialog',
  templateUrl: 'theme-dialog.component.html'
})
export class ThemeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ThemeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  changeTheme(theme: string): void {
    this.data.theme = theme;
    this.dialogRef.close(this.data.theme);
  }
}
