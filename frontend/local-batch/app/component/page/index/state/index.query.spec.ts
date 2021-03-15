import { IndexQuery } from './index.query';
import { IndexStore } from './index.store';

describe('IndexQuery', () => {
  let query: IndexQuery;

  beforeEach(() => {
    query = new IndexQuery(new IndexStore());
  });

  it('should create an instance', () => {
    expect(query).toBeTruthy();
  });
});
