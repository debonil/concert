import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CONCERT';
  showLoader: boolean = true;

  loader(e: boolean) {
    if (e) {
      this.showLoader = true;
    } else {
      setTimeout(()=>{
        this.showLoader = false;
      }, 2000);
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  onDocumentRightClick(event) {
    // console.log(event);
    return false;
  }
}
