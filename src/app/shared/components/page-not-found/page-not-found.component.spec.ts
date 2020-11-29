import {render} from '@testing-library/angular';
import {PageNotFoundComponent} from './page-not-found.component';

describe('PageNotFoundTest', () => {
  it('should return true', () => {
    const component = render(PageNotFoundComponent);
    expect(component).toBeTruthy();
  });
});
