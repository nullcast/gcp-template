import { FormStore } from './form.store';

describe('FormStore', () => {
  let store: FormStore;

  beforeEach(() => {
    store = new FormStore();
  });

  it('should create an instance', () => {
    expect(store).toBeTruthy();
  });
});
