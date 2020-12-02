import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';

@Component({
  selector: 'app-spacex-card-section',
  templateUrl: './spacex-card-section.component.html',
  styleUrls: ['./spacex-card-section.component.scss']
})
export class SpacexCardSectionComponent implements OnInit {
  cardDataList: any;
  showLoadingText = true;
  constructor(private readonly dashboardService: DashboardService) {
    this.getCardDataList();
  }

  private getCardDataList() {
    this.dashboardService.getDataWithOutFiltersFromAPI$().subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.dashboardService.finalDashboardData$.subscribe(data => {
      this.cardDataList = data;
      this.showLoadingText = false;
    });
  }

  ngOnInit(): void {
  }
}
