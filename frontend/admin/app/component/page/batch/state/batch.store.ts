import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface BatchState {
  key: string;
}

export function createInitialState(): BatchState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'batch' })
export class BatchStore extends Store<BatchState> {
  constructor() {
    super(createInitialState());
  }
}
