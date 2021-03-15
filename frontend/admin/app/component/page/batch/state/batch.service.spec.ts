import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BatchService } from './batch.service';
import { BatchStore } from './batch.store';

describe('BatchService', () => {
  let batchService: BatchService;
  let batchStore: BatchStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchService, BatchStore],
      imports: [HttpClientTestingModule]
    });

    batchService = TestBed.get(BatchService);
    batchStore = TestBed.get(BatchStore);
  });

  it('should be created', () => {
    expect(batchService).toBeDefined();
  });
});
