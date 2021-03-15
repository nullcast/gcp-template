import { TestBed } from '@angular/core/testing';

import { ModalLayoutService } from './modal-layout.service';

describe('ModalLayoutService', () => {
  let service: ModalLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
