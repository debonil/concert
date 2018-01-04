import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccomodationAvailabilityComponent } from './accomodation-availability/accomodation-availability.component';
import { CurrentStatusComponent } from './current-status/current-status.component';
import { EnquiriesMenuComponent } from './enquiries-menu/enquiries-menu.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { EnquiriesComponent } from './enquiries.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccomodationAvailabilityComponent, CurrentStatusComponent, EnquiriesMenuComponent, TimeTableComponent, EnquiriesComponent]
})
export class EnquiriesModule { }
