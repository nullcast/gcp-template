import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';
import { FormStore } from './form.store';

describe('FormService', () => {
  let formService: FormService;
  let formStore: FormStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormService, FormStore],
      imports: [HttpClientTestingModule]
    });

    formService = TestBed.get(FormService);
    formStore = TestBed.get(FormStore);
  });

  it('should be created', () => {
    expect(formService).toBeDefined();
  });
});
