import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {Router} from '@angular/router';
import {FilterCriteria} from '../../../model/FilterCriteria.interface';

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
  readonly filteredCriteria: FilterCriteria = {
    isLandingSuccessful: undefined,
    isLaunchSuccessful: undefined,
    launchYear: null
  };

  constructor(private readonly dashboardService: DashboardService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  private goToUrl(path: any[]) {
    this.router.navigate(path);
  }

  filterSuccessFulLaunch() {
    this.filteredCriteria.isLaunchSuccessful = true;
    this.dashboardService.getFilteredDataFromAPI$(this.filteredCriteria).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', (this.buildChangedUrl())]);
  }

  private buildChangedUrl() {
    return Object.values(this.filteredCriteria).toString().replace(/,/g, '/');
  }

  filterFailedLaunch() {
    this.filteredCriteria.isLaunchSuccessful = false;
    this.dashboardService.getFilteredDataFromAPI$(this.filteredCriteria).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', (this.buildChangedUrl())]);
  }

  filteredDataByYear(year: number) {
    this.filteredCriteria.launchYear = year;
    this.dashboardService.getFilteredDataFromAPI$(this.filteredCriteria).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', (this.buildChangedUrl())]);
  }

  filterSuccessLanding() {
    this.filteredCriteria.isLandingSuccessful = true;
    this.dashboardService.getFilteredDataFromAPI$(this.filteredCriteria).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', (this.buildChangedUrl())]);
  }

  filterFailedLanding() {
    this.filteredCriteria.isLandingSuccessful = false;
    this.dashboardService.getFilteredDataFromAPI$(this.filteredCriteria).subscribe(data => {
      this.dashboardService.finalDashboardDataSubject.next(data);
    });
    this.goToUrl(['/filtered-data', (this.buildChangedUrl())]);
  }
}
