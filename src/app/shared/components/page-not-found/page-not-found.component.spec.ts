import {render} from '@testing-library/angular';
import {PageNotFoundComponent} from './page-not-found.component';

describe('NoDataDisplayTests', () => {
  it('should render no data message', async () => {
    const component = await render(PageNotFoundComponent);
    expect(component.getByText('Page not found ):')).toBeTruthy();
  });
});
