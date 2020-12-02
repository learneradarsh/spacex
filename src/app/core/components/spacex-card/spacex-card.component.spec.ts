import {SpacexCardComponent} from './spacex-card.component';
import {render} from '@testing-library/angular';

describe('SpacexCardTestcases', () => {

  function setupTestSubject(data) {
    return render(
      SpacexCardComponent, {
        componentProperties: data
      });
  }

  it('should render component', async () => {
    const mockData = {};
    const component = await setupTestSubject(mockData);
    expect(component).toBeTruthy();
  });

  it('should render all the four labels with data', async () => {
    const mockData = {
      imageUrl: '__test__url',
      imageCaption: '__test__caption',
      wikipediaLinkUrl: '__test__wikipedia__url',
      missionIds: ['1', '2'],
      launchYear: '2017',
      successfulLaunch: true,
      successfulLanding: true
    };
    const component = await setupTestSubject(mockData);

    expect(component.getByText('Mission Ids:')).toBeTruthy();
    expect(component.getByText('Launch Year:')).toBeTruthy();
    expect(component.getByText('2017')).toBeTruthy();
    expect(component.getByText('Successful Launch:')).toBeTruthy();
    expect(component.getByText('true')).toBeTruthy();
    expect(component.getByText('Successful Landing:')).toBeTruthy();
    expect(component.getByText('true')).toBeTruthy();
  });
});
