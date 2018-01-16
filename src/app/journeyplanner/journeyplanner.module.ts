import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialComponentsModule } from '../my-material-components/my-material-components.module';
import { JpInputComponent } from './jp-input/jp-input.component';
import { TrainListComponent } from './train-list/train-list.component';
import { FilterTrainListComponent } from './filter-train-list/filter-train-list.component';
import { TrainComponent } from './train/train.component';
import { JpComponent } from './jp/jp.component';
import { QuickBookComponent } from './quick-book/quick-book.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { PassengerComponent } from './passenger/passenger.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [JpInputComponent, TrainListComponent, FilterTrainListComponent, TrainComponent, JpComponent, QuickBookComponent, PassengerListComponent, PassengerComponent]
})
export class JourneyplannerModule { }
