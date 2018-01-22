import { Component, OnInit, ViewChild, HostListener, Inject, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as appconfig from '../environments/appconfig';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title: string = 'CONCERT';
  // theme: string = 'theme-blue-grey';
  theme: string = 'theme-teal';
  // theme: string = '';
  fontSize: string = 'fontSize-md';

  @ViewChild('focusSetter') focusSetter: any;

  animal: string;
  name: string;

  constructor(private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.router.events
    .subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log(`navigationEnd: ${(event.url)}`);
        this.focusSetter.nativeElement.focus();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.logOut();
    }, 333);
  }

  @HostListener('window:keydown', ['$event'])
  doSomething(event) {
    // console.log(`event: ${JSON.stringify(event)}`+event.keyCode);
    if (event.keyCode === 112) {
      this.router.navigate(['/home']);
      return false;
    } else if (event.keyCode === 113) {
      this.router.navigate(['/quick_book']);
      return false;
    } else if (event.keyCode === 114) {
      this.router.navigate(['/cancellation']);
      return false;
    } else if (event.keyCode === 115) {
      this.router.navigate(['/modification']);
      return false;
    } else if (event.keyCode === 116) {
      this.router.navigate(['/enquiries']);
      return false;
    } else if (event.keyCode === 117) {
      this.router.navigate(['/my']);
      return false;
    } else if (this.router.url === '/enquiries' && (event.keyCode >= 65 && (event.keyCode <= 90))) {
      console.log('/enquiries/' + appconfig.enquiriesList[event.keyCode - 65].path);
      this.router.navigate(['/enquiries/' + appconfig.enquiriesList[event.keyCode - 65].path]);
      return false;
    }
  }

  numToChar(i: number): string {
    return String.fromCharCode(i);
  }

  changeTheme(e: any) {
    console.log(e);
    this.theme = e;
  }

  logOut(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
      disableClose: true,
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialogComponent {

  hide: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  login(): void {
    this.dialogRef.close();
  }
}
