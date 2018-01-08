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
      {name : 'ACCOMMODATION_AVAILABILITY', path : 'accomodation_availability'},
      {name : 'CURRENT_STATUS_OF_PASSENGERS', path : 'current_status_of_passengers'},
      {name : 'TIME_TABLE_ENQUIRY', path : 'time_table_enquiry'},
      {name : 'FARE_ENQUIRY', path : 'fare_enquiry'},
      {name : 'SEARCH FOR PNR', path : 'search_for_pnr'},
      {name : 'BOOKING DATE TIME', path : 'booking_date_time'},
      {name : 'PNR_SESSION_HISTORY', path : 'pnr_session_history'},
      {name : 'PASSEGNERS_BOOKED_IN_EACH_COACH', path : 'passegners_booked_in_each_coach'},
      {name : 'ALL_TRAINS_FOR_A_DESTINATION', path : 'all_trains_for_a_destination'},
      // {name : 'VACANT_BERTH_ENQUIRY__FROM_HHT', path : ''},
      // {name : 'QTAWISE_ACCOMMODATION_AVAILABILITY', path : ''},
      // {name : 'ALL_CLASSES_ACCOMMODATION_AVLBLTY', path : ''},
      {name : 'ACCOMMODATION_AVLBLTY_FOR_A_DSTN', path : 'accommodation_avlblty_for_a_dstn'},
      // {name : 'OPERATOR_INSTRUCTIONS', path : ''},
      {name : 'PASSENGERS_CANCELLED_AFTER_CHARTING', path : 'passengers_cancelled_after_charting'},
      // {name : 'ALL_CLASSES_FARE_ENQUIRY', path : ''},
      // {name : 'INTERMEDIATE_STATIONS_TIME_TABLE', path : ''},
      // {name : 'DETAILED_PNR_ENQUIRY', path : ''},
      // {name : 'ALL_REMOTE_LOCNS_CHARTING_STATUS', path : ''},
      {name : 'PASSENGERS_BOOKED_AFTER_CHARTING', path : 'passengers_booked_after_charting'},
      // {name : 'CURRENT_BOOKING_AVAILABILITY', path : ''},
      // {name : 'REFUNDED_PNR_ENQUIRY', path : ''},
      {name : 'COACH_POSITION_ENQUIRY', path : 'coach_position_enquiry'},
      // {name : 'WAITING_LIST_ENQUIRY', path : ''},
      // {name : 'DUPLICATE_ALLOTMENT_PASSENGERS_LIST', path : ''},
      // {name : 'CUR._BKG._AVAILABILITY(REMOTE_WISE)', path : ''},
      // {name : 'AUTH_PNR_ENQUIRY', path : ''},
      {name : 'NTES TRAIN STATUS', path : 'ntes_train_status'},
      // {name : 'BERTH_TYPE_AVAILABILITY', path : ''},
      // {name : 'ITDC_RELEASE_PENDING_ENQUIRY', path : ''},
    ]
  }

}


class EnqType {
  name: string = '';
  path: string = '';
}
