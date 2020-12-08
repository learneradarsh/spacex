import { Component } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {SpacexCardSectionComponent} from './core/components/spacex-section/spacex-card-section.component';
import {DashboardService} from './core/services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly dashboardService: DashboardService,
              private readonly router: Router) {
    this.router.navigate(['/']);
  }
  developerName = 'Adarsh';

  resetFilter() {
    this.dashboardService.resetFilterCriteria();
    this.router.navigate(['/']);
  }
}
