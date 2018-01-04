import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTrainListComponent } from './filter-train-list/filter-train-list.component';
import { JpComponent } from './jp/jp.component';
import { JpInputComponent } from './jp-input/jp-input.component';
import { TrainComponent } from './train/train.component';
import { TrainListComponent } from './train-list/train-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterTrainListComponent, JpComponent, JpInputComponent, TrainComponent, TrainListComponent]
})
export class JourneyplannerModule { }
