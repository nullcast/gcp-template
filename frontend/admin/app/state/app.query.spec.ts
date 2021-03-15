import { AppQuery } from './app.query';
import { AppStore } from './app.store';

describe('AppQuery', () => {
  let query: AppQuery;

  beforeEach(() => {
    query = new AppQuery(new AppStore());
  });

  it('should create an instance', () => {
    expect(query).toBeTruthy();
  });
});
