import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-spacex-filtered-card-section',
  templateUrl: './spacex-filtered-card-section.component.html',
  styleUrls: ['./spacex-filtered-card-section.component.scss']
})
export class SpacexFilteredCardSectionComponent implements OnInit {
  filteredCardDetailsList;
  showDataLoadingText = true;
  constructor(private readonly dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getFilteredData$().subscribe(data => {
      if (data) {
        this.filteredCardDetailsList = data;
        this.showDataLoadingText = false;
      } else {
        this.showDataLoadingText = false;
      }
    });
  }

}
