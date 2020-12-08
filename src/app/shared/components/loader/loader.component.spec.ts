import {render} from '@testing-library/angular';
import {LoaderComponent} from './loader.component';

describe('loader', () => {
  it('should render loader content', async () => {
    const component = await render(LoaderComponent);
    expect(component.getByText('Data is Loading...')).toBeTruthy();
  });
});
