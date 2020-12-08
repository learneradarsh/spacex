import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {SpacexLaunchInfoDto} from '../../model/SpacexLaunchInfoDto';
import {SpacexCardInfo} from '../../model/SpacexCardInfo.interface';
import {FilterCriteria} from '../../model/FilterCriteria.interface';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  constructor(private readonly  httpClient: HttpClient) {
  }

  private readonly basePath: string = 'https://api.spaceXdata.com/v3/launches';
  private readonly allData$ = this.getDataWithOutFiltersFromAPI$().pipe(
    shareReplay(1)
  );

  filterSelection = new BehaviorSubject<FilterCriteria>(null);
  filterSelection$ = this.filterSelection.asObservable();

  private static transformSpaceLaunchInfoDtoToSpacexCardInfo(launchInfo: SpacexLaunchInfoDto): SpacexCardInfo {
    return {
      imageUrl: launchInfo.links.mission_patch,
      imageCaption: launchInfo.mission_name,
      wikipediaLinkUrl: launchInfo.links.wikipedia,
      missionIds: launchInfo.mission_id.length ? launchInfo.mission_id : 'no mission id available',
      launchYear: launchInfo.launch_year,
      successfulLaunch: launchInfo.launch_success,
      successfulLanding: launchInfo.rocket.first_stage.cores[0].land_success ?? false
      // to make filter example better added false for no data condition
    };
  }

  private getDataWithOutFiltersFromAPI$(): Observable<SpacexCardInfo[]> {
    return this.httpClient.get<SpacexLaunchInfoDto[]>(`${this.basePath}?limit=100`).pipe(
      map(dataList => dataList.map(DashboardService.transformSpaceLaunchInfoDtoToSpacexCardInfo))
    );
  }

  getFilteredData$(): Observable<SpacexCardInfo[]> {
    let filteredData: SpacexCardInfo[] = [];
    return combineLatest([this.allData$, this.filterSelection$])
      .pipe(
        map(([allData, filterSelection]) => {
          if (filterSelection === null) {
            return allData;
          } else {
            filteredData = [...allData];
            if (filterSelection.launchYear !== undefined) {
              filteredData = filteredData.filter(d => d.launchYear === filterSelection.launchYear);
            }
            if (filterSelection.isLaunchSuccessful !== undefined) {
              filteredData = filteredData.filter(d => d.successfulLaunch === filterSelection.isLaunchSuccessful);
            }
            if (filterSelection.isLandingSuccessful !== undefined) {
              filteredData = filteredData.filter(d => d.successfulLanding === filterSelection.isLandingSuccessful);
            }
            return filteredData;
          }
        })
      );
  }

  handleFilterSelection(filterCritera: FilterCriteria): void {
    this.filterSelection.next(filterCritera);
  }

  resetFilterCriteria(): void {
    this.handleFilterSelection(null);
  }
}
