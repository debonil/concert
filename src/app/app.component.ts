import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as appconfig from '../environments/appconfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'CONCERT';
  theme: string = 'theme-blue-grey';

  constructor(private router: Router) {
  }

  @HostListener('window:keydown', ['$event'])
  doSomething(event) {
    console.log(`event: ${JSON.stringify(event)}`+event.keyCode);
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
      this.router.navigate(['/dtc_txn']);
      return false;
    } else if (this.router.url === '/enquiries' && (event.keyCode >= 65 && (event.keyCode <= 90))) {
      console.log('/enquiries/' + appconfig.enquiriesList[event.keyCode-65].path);
      this.router.navigate(['/enquiries/' + appconfig.enquiriesList[event.keyCode-65].path]);
    }
  }

  numToChar(i: number): string {
    return String.fromCharCode(i);
  }

  changeTheme(e: any) {
    console.log(e);
    this.theme = e;
  }
}
