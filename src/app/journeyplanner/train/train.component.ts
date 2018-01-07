import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TrainDetail } from '../../DTOs/TrainDetailDTO';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {

  @Input() train: TrainDetail;
  @Input() index: number;
  @Input() selected: number;

  @Output() trainSelected = new EventEmitter();

  numOfPsgn: string = '';

  constructor() { }

  ngOnInit() {
  }

}
