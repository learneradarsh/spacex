import {Injectable} from '@angular/core';
import {ObjectUnsubscribedError, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {SpacexLaunchInfoDto} from '../../model/SpacexLaunchInfoDto';
import {SpacexCardInfo} from '../../model/SpacexCardInfo.interface';

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

  getDataWithOutFiltersFromAPI$(): Observable<SpacexCardInfo[]> {
    return this.httpClient.get<SpacexLaunchInfoDto[]>(`${this.resourcePath}?limit=10`).pipe(
      map(dataList => dataList.map(DashboardService.transformSpaceLaunchInfoDtoToSpacexCardInfo))
    );
  }

  getFilteredDataByLaunchStatusFromAPI$(isSuccessfulLaunch: boolean): Observable<SpacexCardInfo[]> {
    return this.httpClient.get<SpacexLaunchInfoDto[]>(`${this.resourcePath}?limit=10&launch_success=${isSuccessfulLaunch}`).pipe(
      map(dataList => dataList.map(DashboardService.transformSpaceLaunchInfoDtoToSpacexCardInfo))
    );
  }

  getFilteredDataByYearFromAPI$(year: number): Observable<SpacexCardInfo[]> {
    return this.httpClient.get<SpacexLaunchInfoDto[]>(`${this.resourcePath}?limit=10&launch_success=true&land_success=true&launch_year=${year}`).pipe(
      map(dataList => dataList.map(DashboardService.transformSpaceLaunchInfoDtoToSpacexCardInfo))
    );
  }

  getFilteredDataByLandingStatusFromAPI$(isSuccessfulLanding: boolean): Observable<SpacexCardInfo[]> {
    return this.httpClient.get<SpacexLaunchInfoDto[]>(`${this.resourcePath}?limit=10&land_success=${isSuccessfulLanding}`).pipe(
      map(dataList => dataList.map(DashboardService.transformSpaceLaunchInfoDtoToSpacexCardInfo))
    );
  }
}
