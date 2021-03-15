import { IndexStore } from './index.store';

describe('IndexStore', () => {
  let store: IndexStore;

  beforeEach(() => {
    store = new IndexStore();
  });

  it('should create an instance', () => {
    expect(store).toBeTruthy();
  });
});
