import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { MatSnackBar } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { CommonService } from '../../services/common.services';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-current-booking-availability',
  templateUrl: './current-booking-availability.component.html',
  styleUrls: ['./current-booking-availability.component.scss']
})
export class CurrentBookingAvailabilityComponent implements OnInit {

  stnList = [];
  origin: FormControl = new FormControl();
  destin: FormControl = new FormControl();

  journeyDate: Date = new Date();

  filteredOriginOptions: Observable<string[]>;
  filteredDestinOptions: Observable<string[]>;

  modify: boolean = false;

  accomodationAvailabilityFetched: boolean;
  accomodationAvailabilityForm: FormGroup;

  inputTrainNo: FormControl;
  inputTrainName: FormControl;

  fetchedAccomodationAvailability: any = [
    {train_no: '12560', train_name: 'ANVT BUI SF EXP', src: 'NDLS', dep: '09:25', dest: 'BUI', arr: '00:30', chart_status: 'NOT DONE', cur_bkg_status: 'NO', days_running: '', classes: ''},
    {train_no: '12560', train_name: 'ANVT BUI SF EXP', src: 'NDLS', dep: '09:25', dest: 'BUI', arr: '00:30', chart_status: 'DONE', cur_bkg_status: 'YES', days_running: '', classes: ''},
    {train_no: '12560', train_name: 'ANVT BUI SF EXP', src: 'NDLS', dep: '09:25', dest: 'BUI', arr: '00:30', chart_status: 'NOT DONE', cur_bkg_status: 'NO', days_running: '', classes: ''},
    {train_no: '12560', train_name: 'ANVT BUI SF EXP', src: 'NDLS', dep: '09:25', dest: 'BUI', arr: '00:30', chart_status: 'DONE', cur_bkg_status: 'YES', days_running: '', classes: ''},
    {train_no: '12560', train_name: 'ANVT BUI SF EXP', src: 'NDLS', dep: '09:25', dest: 'BUI', arr: '00:30', chart_status: 'NOT DONE', cur_bkg_status: 'YES', days_running: '', classes: ''},
    {train_no: '12560', train_name: 'ANVT BUI SF EXP', src: 'NDLS', dep: '09:25', dest: 'BUI', arr: '00:30', chart_status: 'NOT DONE', cur_bkg_status: 'YES', days_running: '', classes: ''},
    {train_no: '12560', train_name: 'ANVT BUI SF EXP', src: 'NDLS', dep: '09:25', dest: 'BUI', arr: '00:30', chart_status: 'NOT DONE', cur_bkg_status: 'YES', days_running: '', classes: ''},
  ];

  todayDate: Date = new Date();
  // stnList:  any = [
  //   {stnCode: 'NDLS', stnName: 'New Delhi'},
  //   {stnCode: 'CNB', stnName: 'Kanpur Central'},
  //   {stnCode: 'ALD', stnName: 'Allahabad Jn'},
  //   {stnCode: 'MUV', stnName: 'Manduadih'},
  // ];

  constructor(private commonService: CommonService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.inputTrainNo = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]);
    this.inputTrainName = new FormControl({value: '', disabled: true}, [Validators.required]);
    this.accomodationAvailabilityForm =  this.fb.group({
      // inputTrainNo: this.inputTrainNo,
      // inputTrainName: this.inputTrainName
    });
  }

  ngOnInit() {
    this.commonService.getStationNameList()
    .subscribe((val: Array<string>) => {
      this.stnList = val;
      this.filteredOriginOptions = this.origin.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
      this.filteredDestinOptions = this.destin.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
    });
  }

  filter(val: string): string[] {
    if (val.length>1)
      return this.stnList.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) >= 0);
    else
      return [];
  }


  getInputTrainNoErrorMessage() {
    return this.inputTrainNo.hasError('required') ? 'You must enter a value' : 'Enter a valid Train No.';
  }

  onlyNumericInput(e:any) {
    let key: any;
    key = ((document.all) ? (key = e.keyCode) : (key = e.which));
    return (key === 8 || key === 32 || (key >= 48 && key <= 57));
  }

  inputTrainNoChangeFn(e: KeyboardEvent) {
    // console.log('e: ' + e.key);

    if (this.inputTrainNo.value.length === 5) {
      this.inputTrainName.setValue('SHIV GANGA EXP');
    }
  }

  fetchAccomodationAvailability() {
    if (this.accomodationAvailabilityForm.valid) {
      this.snackBar.open('Accomodation Availability Fetched!', '', {
        duration: 3000,
      });

      this.accomodationAvailabilityFetched = true;
    } else {
      this.snackBar.open('Please fill the form appropriately!', '', {
        duration: 4000,
      });
    }
  }
}
