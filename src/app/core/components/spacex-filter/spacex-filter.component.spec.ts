import {render} from '@testing-library/angular';
import {SpacexFilterComponent} from './spacex-filter.component';
import {DashboardService} from '../../services/dashboard.service';
import {Router, RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
function setupTestSubject() {
  return render(
    SpacexFilterComponent, {
      providers: [
        DashboardService,
        HttpClient,
        Router
      ],
      imports: [
        HttpClientModule,
        RouterModule
      ]
    }
  );
}
describe('SpacexFilterTests', () => {
  it('should render component', () => {
    const component = setupTestSubject();
    expect(component).toBeTruthy();
  });
});
