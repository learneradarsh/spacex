import {of} from 'rxjs';
import {DashboardService} from './dashboard.service';

describe('DashboardServiceTests', () => {
  const mockedWithoutFiltersAPIResponse = {
    imageUrl: '__test_image_url__',
    imageCaption: '__test__image__caption__',
    wikipediaLinkUrl: '__testwikipediurl__',
    missionIds: ['123', '345'],
    launchYear: '2016',
    successfulLaunch: true,
    successfulLanding: true,
  };

  const httpClient = {
    get: jest.fn()
  };

  let service: DashboardService;

  beforeEach(() => {
    service = new DashboardService(
      httpClient as any
    );
  });

  it('should return data without filters', () => {
    httpClient.get.mockReturnValue(of(mockedWithoutFiltersAPIResponse));
    service.getDataWithOutFiltersFromAPI$().subscribe(data => {
      expect(data.length).not.toBe(0);
    });
  });
});
