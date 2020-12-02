import {render} from '@testing-library/angular';
import {SpacexFilterComponent} from './spacex-filter.component';
import {DashboardService} from '../../services/dashboard.service';
import {Router} from '@angular/router';
import {createMock} from '@testing-library/angular/jest-utils';

function setupTestSubject() {
  const mockDashboardService = createMock(DashboardService);
  const mockRouter = createMock(Router);
  return render(
    SpacexFilterComponent, {
      providers: [
        {provide: DashboardService, useValue: mockDashboardService},
        {provide: Router, useValue: mockRouter}
      ]
    }
  );
}
describe('SpacexFilterTests', () => {
  it('should render component', async () => {
    const component = await setupTestSubject();
    expect(component).toBeTruthy();
  });

  it('should render all three sections of filter', async () => {
    const component = await setupTestSubject();
    expect(component.getByText('Launch Year')).toBeTruthy();
    expect(component.getByText('Successful Launch')).toBeTruthy();
    expect(component.getByText('Successful Landing')).toBeTruthy();
  });
});
