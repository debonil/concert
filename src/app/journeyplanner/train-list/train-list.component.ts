import { Component, OnInit, Input } from '@angular/core';
import { TrainDetail } from '../../DTOs/TrainDetailDTO';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss']
})
export class TrainListComponent implements OnInit {

  @Input() trainList: Array<TrainDetail>;
  selected: number = -1;

  quota: string = '';
  class: string = '';
  sortBy: string = '';
  constructor() { }

  ngOnInit() {
    console.log("trainList:" + JSON.stringify(this.trainList));
  }

}
