import {render} from '@testing-library/angular';
import {NoDataToDisplayComponent} from './no-data-to-display.component';

describe('NoDataDisplayTests', () => {
  it('should return true', () => {
    const component = render(NoDataToDisplayComponent);
    expect(component).toBeTruthy();
  });
});
