import { BatchStore } from './batch.store';

describe('BatchStore', () => {
  let store: BatchStore;

  beforeEach(() => {
    store = new BatchStore();
  });

  it('should create an instance', () => {
    expect(store).toBeTruthy();
  });
});
