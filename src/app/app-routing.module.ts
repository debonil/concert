import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JpComponent } from './journeyplanner/jp/jp.component';
import { DtcTxnComponent } from './dtc-txn/dtc-txn.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { EnquiriesMenuComponent } from './enquiries/enquiries-menu/enquiries-menu.component';
import { AccomodationAvailabilityComponent } from './enquiries/accomodation-availability/accomodation-availability.component';
import { CurrentStatusComponent } from './enquiries/current-status/current-status.component';
import { TimeTableComponent } from './enquiries/time-table/time-table.component';
import { FareEnquiryComponent } from './enquiries/fare-enquiry/fare-enquiry.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: JpComponent},
  // { path: 'reservation', component: ReservationComponent},
  // { path: 'cancellation', component: CancellationComponent},
  // { path: 'modification', component: ModificationComponent},
  { path: 'enquiries', component: EnquiriesComponent,
    children: [
      { path: '', component: EnquiriesMenuComponent },
      { path: 'accomodation_availability', component: AccomodationAvailabilityComponent },
      { path: 'current_status_of_passengers', component: CurrentStatusComponent },
      { path: 'time_table_enquiry', component: TimeTableComponent },
      { path: 'fare_enquiry', component: FareEnquiryComponent },
    ]
  },
  { path: 'dtcTxn', component: DtcTxnComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
