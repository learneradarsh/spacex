import {render, fireEvent} from '@testing-library/angular';
import {SpacexFilterComponent} from './spacex-filter.component';
import {DashboardService} from '../../services/dashboard.service';
import {Router} from '@angular/router';
import {createMock} from '@testing-library/angular/jest-utils';
import {of} from 'rxjs';

async function setupTestSubject() {
  const mockDashboardService = {
    filterSelection$: of(null),
    handleFilterSelection: jest.fn()
  };
  const mockRouter = createMock(Router);
  const component = await render(
    SpacexFilterComponent, {
      providers: [
        {provide: DashboardService, useValue: mockDashboardService},
        {provide: Router, useValue: mockRouter}
      ]
    }
  );
  return {
    component,
    mockDashboardService,
    mockRouter
  };
}

describe('SpacexFilterTests', () => {
  it('should render component', async () => {
    const component = await setupTestSubject();
    expect(component).toBeTruthy();
  });

  it('should render all three sub sections of filter', async () => {
    const {component} = await setupTestSubject();

    expect(component.getByText('Launch Year')).toBeTruthy();
    expect(component.getByText('Successful Launch')).toBeTruthy();
    expect(component.getByText('Successful Landing')).toBeTruthy();
  });

  it('should show selected state of button when clicked', async () => {
    const {component} = await setupTestSubject();
    const successFulLaunchTrueButton = component.container.querySelector('[aria-label="spacex-button-success-launch-true"]');

    expect(successFulLaunchTrueButton).toBeTruthy();
    expect(component.container.querySelector('.spacex-button-selected')).not.toBeTruthy();
    fireEvent.click(successFulLaunchTrueButton);
    expect(component.container.querySelector('.spacex-button-selected')).toBeTruthy();
  });
});
