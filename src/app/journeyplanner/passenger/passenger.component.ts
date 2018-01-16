import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {

  @Input() psgn: any

  accomodationAvailabilityFetched: boolean;
  accomodationAvailabilityForm: FormGroup;

  psgnAge: FormControl;
  psgnName: FormControl;

  todayDate: Date = new Date();

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.psgnAge = new FormControl('', [Validators.required, Validators.min(5), Validators.max(120)]);
    this.psgnName = new FormControl('', [Validators.required]);

    this.accomodationAvailabilityForm =  this.fb.group({
      psgnAge: this.psgnAge,
      psgnName: this.psgnName
    });
  }

  ngOnInit() {
  }

  getPsgnAgeErrorMessage() {
    return this.psgnAge.hasError('required') ? 'You must enter a value.' : 'Enter a valid age.';
  }
  getPsgnNameErrorMessage() {
    return this.psgnAge.hasError('required') ? 'You must enter a value.' : 'Enter a valid age.';
  }

  onlyNumericInput(e:any) {
    let key: any;
    key = ((document.all) ? (key = e.keyCode) : (key = e.which));
    return (key === 8 || key === 32 || (key >= 48 && key <= 57));
  }

  onlyAlphaInput(e:any) {
    let key: any;
    key = ((document.all) ? (key = e.keyCode) : (key = e.which));
    return (key === 8 || key === 32 || ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)));
  }

  psgnAgeChangeFn(e: KeyboardEvent) {
    console.log('e: ' + e.key);

    // if (this.psgnAge.value.length === 5) {
    //   this.psgnName.setValue('SHIV GANGA EXP');
    // }
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
