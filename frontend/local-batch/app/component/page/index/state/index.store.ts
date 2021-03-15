import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface IndexState {
  loading: boolean;
}

export function createInitialState(): IndexState {
  return {
    loading: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'index' })
export class IndexStore extends Store<IndexState> {
  constructor() {
    super(createInitialState());
  }
}
