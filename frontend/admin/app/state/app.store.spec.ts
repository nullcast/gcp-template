import { AppStore } from './app.store';

describe('AppStore', () => {
  let store: AppStore;

  beforeEach(() => {
    store = new AppStore();
  });

  it('should create an instance', () => {
    expect(store).toBeTruthy();
  });
});
