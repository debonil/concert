import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enquiries-menu',
  templateUrl: './enquiries-menu.component.html',
  styleUrls: ['./enquiries-menu.component.scss']
})
export class EnquiriesMenuComponent implements OnInit {

  enquiriesList: Array<EnqType> = [];
  constructor() { }

  ngOnInit() {
    this.enquiriesList = [
      {name : 'ACCOMMODATION AVAILABILITY', path : 'accomodation_availability'},
      {name : 'CURRENT STATUS OF PASSENGERS', path : 'current_status_of_passengers'},
      {name : 'TIME TABLE ENQUIRY', path : 'time_table_enquiry'},
      {name : 'FARE ENQUIRY', path : 'fare_enquiry'},
      {name : 'SEARCH FOR PNR', path : 'search_for_pnr'},
      {name : 'BOOKING DATE TIME', path : 'booking_date_time'},
      {name : 'PNR SESSION HISTORY', path : 'pnr_session_history'},
      {name : 'PASSEGNERS BOOKED IN EACH COACH', path : 'passegners_booked_in_each_coach'},
      {name : 'ALL TRAINS FOR A DESTINATION', path : 'all_trains_for_a_destination'},
      // {name : 'VACANT_BERTH_ENQUIRY__FROM_HHT', path : ''},
      // {name : 'QTAWISE_ACCOMMODATION_AVAILABILITY', path : ''},
      // {name : 'ALL_CLASSES_ACCOMMODATION_AVLBLTY', path : ''},
      {name : 'ACCOMMODATION AVLBLTY FOR A DSTN', path : 'accommodation_avlblty_for_a_dstn'},
      // {name : 'OPERATOR_INSTRUCTIONS', path : ''},
      {name : 'PASSENGERS CANCELLED AFTER CHARTING', path : 'passengers_cancelled_after_charting'},
      // {name : 'ALL_CLASSES_FARE_ENQUIRY', path : ''},
      // {name : 'INTERMEDIATE_STATIONS_TIME_TABLE', path : ''},
      // {name : 'DETAILED_PNR_ENQUIRY', path : ''},
      {name : 'ALL REMOTE LOCNS CHARTING STATUS', path : 'charting_status'},
      {name : 'PASSENGERS BOOKED AFTER CHARTING', path : 'passengers_booked_after_charting'},
      {name : 'CURRENT BOOKING AVAILABILITY', path : 'current_booking_availability'},
      // {name : 'REFUNDED_PNR_ENQUIRY', path : ''},
      {name : 'COACH POSITION ENQUIRY', path : 'coach_position_enquiry'},
      // {name : 'WAITING_LIST_ENQUIRY', path : ''},
      // {name : 'DUPLICATE_ALLOTMENT_PASSENGERS_LIST', path : ''},
      // {name : 'CUR BKG AVAILABILITY REMOTE WISE', path : 'cur_bkg_availability_remote_wise'},
      // {name : 'AUTH_PNR_ENQUIRY', path : ''},
      {name : 'NTES TRAIN STATUS', path : 'ntes_train_status'},
      {name : 'BERTH TYPE AVAILABILITY', path : 'berth_type_availability'},
      // {name : 'ITDC_RELEASE_PENDING_ENQUIRY', path : ''},
    ]
  }

}


class EnqType {
  name: string = '';
  path: string = '';
}
