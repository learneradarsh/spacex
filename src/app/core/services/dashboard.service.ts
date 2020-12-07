import {Injectable} from '@angular/core';
import {ObjectUnsubscribedError, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {SpacexLaunchInfoDto} from '../../model/SpacexLaunchInfoDto';
import {SpacexCardInfo} from '../../model/SpacexCardInfo.interface';
import {FilterCriteria} from '../../model/FilterCriteria.interface';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  constructor(private readonly  httpClient: HttpClient) {
  }
  private readonly resourcePath: string = 'https://api.spaceXdata.com/v3/launches';
  readonly finalDashboardDataSubject = new Subject();
  readonly finalDashboardData$ = this.finalDashboardDataSubject.asObservable();
  private static transformSpaceLaunchInfoDtoToSpacexCardInfo(launchInfo: SpacexLaunchInfoDto): SpacexCardInfo {
    return {
        imageUrl: launchInfo.links.mission_patch,
        imageCaption: launchInfo.mission_name,
        wikipediaLinkUrl: launchInfo.links.wikipedia,
        missionIds: launchInfo.mission_id.length ? launchInfo.mission_id : 'no mission id available',
        launchYear: launchInfo.launch_year,
        successfulLaunch: launchInfo.launch_success,
        successfulLanding: launchInfo.rocket.first_stage.cores[0].land_success
    };
  }

  protected applyLaunchYearFilter(launchYear: number): string {
    return launchYear ? `&launch_year=${launchYear}` : '';
  }

  protected applyLaunchSuccessStatusFilter(isLaunchSuccessful: boolean) {
    if (isLaunchSuccessful !== undefined) {
      return `&launch_success=${isLaunchSuccessful}`;
    } else {
      return '';
    }
  }

  protected applyLandingSuccessStatusFilter(isLandingSuccessful: boolean) {
    if (isLandingSuccessful !== undefined) {
      return `&landing_sucess=${isLandingSuccessful}`;
    } else {
      return '';
    }
  }

  getDataWithOutFiltersFromAPI$(): Observable<SpacexCardInfo[]> {
    return this.httpClient.get<SpacexLaunchInfoDto[]>(`${this.resourcePath}?limit=100`).pipe(
      map(dataList => dataList.map(DashboardService.transformSpaceLaunchInfoDtoToSpacexCardInfo))
    );
  }

  getFilteredDataFromAPI$(filterCriteria: FilterCriteria): Observable<SpacexCardInfo[]> {
    return this.httpClient.get<SpacexLaunchInfoDto[]>(`${this.resourcePath}?limit=100${this.applyLaunchSuccessStatusFilter(filterCriteria.isLaunchSuccessful)}${this.applyLandingSuccessStatusFilter(filterCriteria.isLandingSuccessful)}${this.applyLaunchYearFilter(filterCriteria.launchYear)}`)
      .pipe(
        map(dataList => dataList.map(DashboardService.transformSpaceLaunchInfoDtoToSpacexCardInfo))
      );
  }
}
