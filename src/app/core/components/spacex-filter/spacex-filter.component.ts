import {Component, OnInit} from '@angular/core';
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
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020'
  ];
  filteredCriteria: FilterCriteria = {
    isLandingSuccessful: undefined,
    isLaunchSuccessful: undefined,
    launchYear: undefined
  };

  constructor(private readonly dashboardService: DashboardService,
              private readonly router: Router) {
    this.dashboardService.filterSelection$.subscribe(data => {
      this.filteredCriteria = {...data};
    });
  }

  ngOnInit(): void {
  }

  private goToUrl(path: any[]) {
    this.router.navigate(path);
  }

  private buildChangedUrl() {
    return Object.values(this.filteredCriteria).toString().replace(/,/g, '/');
  }

  private filterDataAndChangeUrl() {
    this.dashboardService.handleFilterSelection(this.filteredCriteria);
    this.goToUrl(['/filtered-data', (this.buildChangedUrl())]);
  }

  filterSuccessFulLaunch() {
    this.filteredCriteria.isLaunchSuccessful = true;
    this.filterDataAndChangeUrl();
  }

  filterFailedLaunch() {
    this.filteredCriteria.isLaunchSuccessful = false;
    this.filterDataAndChangeUrl();
  }

  filteredDataByYear(year: string) {
    this.filteredCriteria.launchYear = year;
    this.filterDataAndChangeUrl();
  }

  filterSuccessLanding() {
    this.filteredCriteria.isLandingSuccessful = true;
    this.filterDataAndChangeUrl();
  }

  filterFailedLanding() {
    this.filteredCriteria.isLandingSuccessful = false;
    this.filterDataAndChangeUrl();
  }

}
