import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { BatchState, BatchStore } from './batch.store';

@Injectable({ providedIn: 'root' })
export class BatchQuery extends Query<BatchState> {
  constructor(protected store: BatchStore) {
    super(store);
  }
}
