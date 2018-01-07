import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialComponentsModule } from '../my-material-components/my-material-components.module';
import { JpInputComponent } from './jp-input/jp-input.component';
import { TrainListComponent } from './train-list/train-list.component';
import { FilterTrainListComponent } from './filter-train-list/filter-train-list.component';
import { TrainComponent } from './train/train.component';
import { JpComponent } from './jp/jp.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [JpInputComponent, TrainListComponent, FilterTrainListComponent, TrainComponent, JpComponent]
})
export class JourneyplannerModule { }
