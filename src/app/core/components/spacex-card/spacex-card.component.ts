import {Component, Input, OnInit} from '@angular/core';
import {SpacexCardInfo} from '../../../model/SpacexCardInfo.interface';

@Component({
  selector: 'app-spacex-card',
  templateUrl: './spacex-card.component.html',
  styleUrls: ['./spacex-card.component.scss']
})
export class SpacexCardComponent implements OnInit {

  @Input() cardData: SpacexCardInfo;
  constructor() {
  }

  ngOnInit(): void {
  }

}
