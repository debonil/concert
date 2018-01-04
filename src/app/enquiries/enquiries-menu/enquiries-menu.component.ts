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
      {name : 'FARE_ENQUIRY', path : ''},
      {name : 'PNR_NUMBER_OF_PASSENGERS', path : ''},
      {name : 'DATE_OF_BOOKING_AND_SHIFT_ID', path : ''},
      {name : 'PNR_SESSION_HISTORY', path : ''},
      {name : 'PASSEGNERS_BOOKED_IN_EACH_COACH', path : ''},
      {name : 'ALL_TRAINS_FOR_A_DESTINATION', path : ''},
      {name : 'VACANT_BERTH_ENQUIRY__FROM_HHT', path : ''},
      {name : 'QTAWISE_ACCOMMODATION_AVAILABILITY', path : ''},
      {name : 'ALL_CLASSES_ACCOMMODATION_AVLBLTY', path : ''},
      {name : 'ACCOMMODATION_AVLBLTY_FOR_A_DSTN', path : ''},
      {name : 'OPERATOR_INSTRUCTIONS', path : ''},
      {name : 'PASSENGERS_CANCELLED_AFTER_CHARTING', path : ''},
      {name : 'ALL_CLASSES_FARE_ENQUIRY', path : ''},
      {name : 'INTERMEDIATE_STATIONS_TIME_TABLE', path : ''},
      {name : 'DETAILED_PNR_ENQUIRY', path : ''},
      {name : 'ALL_REMOTE_LOCNS_CHARTING_STATUS', path : ''},
      {name : 'PASSENGERS_BOOKED_AFTER_CHARTING', path : ''},
      {name : 'CURRENT_BOOKING_AVAILABILITY', path : ''},
      {name : 'REFUNDED_PNR_ENQUIRY', path : ''},
      {name : 'COACH_POSITION_ENQUIRY', path : ''},
      {name : 'WAITING_LIST_ENQUIRY', path : ''},
      {name : 'DUPLICATE_ALLOTMENT_PASSENGERS_LIST', path : ''},
      {name : 'CUR._BKG._AVAILABILITY(REMOTE_WISE)', path : ''},
      {name : 'AUTH_PNR_ENQUIRY', path : ''},
      {name : 'NTES_—_TRAIN_STATUS', path : ''},
      {name : 'BERTH_TYPE_AVAILABILITY', path : ''},
      {name : 'ITDC_RELEASE_PENDING_ENQUIRY', path : ''},
    ]
  }

}


class EnqType {
  name: string = '';
  path: string = '';
}
