import {AppComponent} from './app.component';
import {fireEvent, render} from '@testing-library/angular';
import {createMock} from '@testing-library/angular/jest-utils';
import {DashboardService} from './core/services/dashboard.service';
import {Router, Routes} from '@angular/router';
import {SpacexFilterComponent} from './core/components/spacex-filter/spacex-filter.component';
import {of} from 'rxjs';
import {SpacexCardSectionComponent} from './core/components/spacex-section/spacex-card-section.component';
import {SpacexFilteredCardSectionComponent} from './core/components/spacex-filtered-card-section/spacex-filtered-card-section.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {SpacexCardComponent} from './core/components/spacex-card/spacex-card.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {NoDataToDisplayComponent} from './shared/components/no-data-to-display/no-data-to-display.component';

async function setupTestSubject() {
  const routes: Routes = [
    { path: '', component: SpacexCardSectionComponent },
    {path: 'filtered-data/:param', component: SpacexFilteredCardSectionComponent},
    {path: '**', component: PageNotFoundComponent}
  ];
  const mockDashboardService = {
    filterSelection$: of(null),
    handleFilterSelection: jest.fn(),
    getFilteredData$: jest.fn( () => of([])),
    resetFilterCriteria: jest.fn()
  };
  const mockRouter = createMock(Router);
  const component = await render(
    AppComponent, {
      imports: [
        BrowserDynamicTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        SpacexFilterComponent,
        SpacexCardSectionComponent,
        SpacexFilteredCardSectionComponent,
        PageNotFoundComponent,
        SpacexCardComponent,
        LoaderComponent,
        NoDataToDisplayComponent
      ],
      providers: [
        {provide: DashboardService, useValue: mockDashboardService},
        {provide: Router, useValue: mockRouter},
      ]
    }
  );
  return {
    component,
    mockDashboardService
  };
}

describe('AppComponent', () => {
  it('should render header of the page', async () => {
    const {component} = await setupTestSubject();
    expect(component.container.querySelector('[aria-label="spacex-header"]').textContent).toBe('SpaceX Launch Programs');
  });

  it('should render developed label with developer name', async () => {
    const {component} = await setupTestSubject();
    expect(component.getByText('Developed by: Adarsh')).toBeTruthy();
  });

  it('should resetFilterCriteria when clicked on header link', async () => {
    const {component, mockDashboardService} = await setupTestSubject();
    const spacexHeader = component.container.querySelector('[aria-label="spacex-header"]');
    fireEvent.click(spacexHeader);
    expect(mockDashboardService.resetFilterCriteria).toHaveBeenCalled();
  });
});
