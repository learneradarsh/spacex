import {BehaviorSubject, of, Subject} from 'rxjs';
import {SpacexCardSectionComponent} from './spacex-card-section.component';
import {render} from '@testing-library/angular';
import {DashboardService} from '../../services/dashboard.service';
import {SpacexCardInfo} from '../../../model/SpacexCardInfo.interface';
import {FilterCriteria} from '../../../model/FilterCriteria.interface';
import {SpacexCardComponent} from '../spacex-card/spacex-card.component';
import {LoaderComponent} from '../../../shared/components/loader/loader.component';
import {NoDataToDisplayComponent} from '../../../shared/components/no-data-to-display/no-data-to-display.component';

async function setupTestSubject(data) {
  const filterSelectionSub = new BehaviorSubject<FilterCriteria>(null);
  const dataSub = new Subject();
  const mockDashboardService = {
    filterSelection$: of(filterSelectionSub),
    handleFilterSelection: jest.fn(),
    getFilteredData$: jest.fn( () => dataSub.asObservable()),
    resetFilterCriteria: jest.fn()
  };

  const component = await render(SpacexCardSectionComponent, {
      componentProperties: {
        cardDataList: data
      },
    declarations: [SpacexCardComponent, LoaderComponent, NoDataToDisplayComponent],
    providers: [{provide: DashboardService, useValue: mockDashboardService}]
  });

  return {
    component,
    mockDashboardService,
    filterSelectionSub,
    dataSub
  };
}

describe('SpacexcardSection', () => {
  it('loader should not be visible when data loaded successfully', async () => {
    const mockData: SpacexCardInfo[] = [{
      imageUrl: '__test__url',
      imageCaption: '__test__caption',
      wikipediaLinkUrl: '__test__wikipedia__url',
      missionIds: ['1', '2'],
      launchYear: '2017',
      successfulLaunch: true,
      successfulLanding: true
    }];
    const mockFilterCriteria: FilterCriteria = {
      isLandingSuccessful: true,
      isLaunchSuccessful: true,
      launchYear: '2017'
    };
    const {component, filterSelectionSub, dataSub} = await setupTestSubject(mockData);
    expect(component.getByText('Data is Loading...')).toBeTruthy();
    filterSelectionSub.next(mockFilterCriteria);
    dataSub.next(mockData);
    component.detectChanges();
  });

  it('should show no data notification if no data passed', async () => {
    const mockData: SpacexCardInfo[] = [];
    const mockFilterCriteria: FilterCriteria = {
      isLandingSuccessful: true,
      isLaunchSuccessful: true,
      launchYear: '2017'
    };
    const {component, filterSelectionSub, dataSub} = await setupTestSubject(mockData);
    expect(component.getByText('Data is Loading...')).toBeTruthy();
    filterSelectionSub.next(mockFilterCriteria);
    dataSub.next(mockData);
    component.detectChanges();

    expect(component.getByText('No data to display')).toBeTruthy();
  });
});
