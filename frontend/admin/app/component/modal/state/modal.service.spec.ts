import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { ModalStore } from './modal.store';

describe('ModalService', () => {
  let modalService: ModalService;
  let modalStore: ModalStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService, ModalStore],
      imports: [HttpClientTestingModule]
    });

    modalService = TestBed.get(ModalService);
    modalStore = TestBed.get(ModalStore);
  });

  it('should be created', () => {
    expect(modalService).toBeDefined();
  });
});
