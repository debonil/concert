import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'CONCERT';
  theme: string = 'theme-indigo';

  @HostListener('document:contextmenu', ['$event'])
  onDocumentRightClick(event) {
    // console.log(event);
    return false;
  }
}
