import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { AppStore } from './app.store';

describe('AppService', () => {
  let appService: AppService;
  let appStore: AppStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService, AppStore],
      imports: [HttpClientTestingModule]
    });

    appService = TestBed.get(AppService);
    appStore = TestBed.get(AppStore);
  });

  it('should be created', () => {
    expect(appService).toBeDefined();
  });
});
