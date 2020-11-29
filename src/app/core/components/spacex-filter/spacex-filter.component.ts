import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-spacex-filter',
  templateUrl: './spacex-filter.component.html',
  styleUrls: ['./spacex-filter.component.scss']
})
export class SpacexFilterComponent implements OnInit {
  readonly years = [
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020
  ];
  constructor(private readonly dashboardService: DashboardService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  filterSuccessFulLaunch() {
    this.dashboardService.getFilteredDataByLaunchStatusFromAPI$(true).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', 'successful-launch']);
  }

  private goToUrl(path: any[]) {
    this.router.navigate(path);
  }

  filterFailedLaunch() {
    this.dashboardService.getFilteredDataByLaunchStatusFromAPI$(false).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', 'failed-launch']);
  }

  filteredDataByYear(year: number) {
    this.dashboardService.getFilteredDataByYearFromAPI$(year).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', year]);
  }

  filterSuccessLanding() {
    this.dashboardService.getFilteredDataByLandingStatusFromAPI$(true).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', 'successful-landing']);
  }

  filterFailedLanding() {
    this.dashboardService.getFilteredDataByLandingStatusFromAPI$(false).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', 'failed-landing']);
  }
}
