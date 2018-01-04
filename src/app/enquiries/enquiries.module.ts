import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialComponentsModule } from '../my-material-components/my-material-components.module';
import { AppRoutingModule } from '../app-routing.module';
import { EnquiriesComponent } from './enquiries.component';
import { EnquiriesMenuComponent } from './enquiries-menu/enquiries-menu.component';
import { AccomodationAvailabilityComponent } from './accomodation-availability/accomodation-availability.component';
import { CurrentStatusComponent } from './current-status/current-status.component';
import { TimeTableComponent } from './time-table/time-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    MyMaterialComponentsModule
  ],
  declarations: [EnquiriesComponent, EnquiriesMenuComponent, AccomodationAvailabilityComponent, CurrentStatusComponent, TimeTableComponent],
  exports: [EnquiriesComponent]
})
export class EnquiriesModule { }
