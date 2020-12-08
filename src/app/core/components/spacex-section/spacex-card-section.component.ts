import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {SpacexCardInfo} from '../../../model/SpacexCardInfo.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-spacex-card-section',
  templateUrl: './spacex-card-section.component.html',
  styleUrls: ['./spacex-card-section.component.scss']
})
export class SpacexCardSectionComponent implements OnInit, OnDestroy {
  cardDataList: SpacexCardInfo[];
  showLoader = true;
  private subscription: Subscription;
  constructor(private readonly dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.resetFilterCriteria();
    this.subscription = this.dashboardService.getFilteredData$().subscribe(data => {
      this.cardDataList = data;
      this.showLoader = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
