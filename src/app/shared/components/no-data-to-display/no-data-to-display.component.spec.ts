import {render} from '@testing-library/angular';
import {NoDataToDisplayComponent} from './no-data-to-display.component';

describe('NoDataDisplayTests', () => {
  it('should render no data message', async () => {
    const component = await render(NoDataToDisplayComponent);
    expect(component.getByText('No data to display')).toBeTruthy();
  });
});
