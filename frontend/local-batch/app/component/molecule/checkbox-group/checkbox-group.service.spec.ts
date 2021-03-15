import { TestBed } from '@angular/core/testing';

import { CheckboxGroupService } from './checkbox-group.service';

describe('CheckboxGroupService', () => {
  let service: CheckboxGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckboxGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
