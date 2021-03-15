import { BatchQuery } from './batch.query';
import { BatchStore } from './batch.store';

describe('BatchQuery', () => {
  let query: BatchQuery;

  beforeEach(() => {
    query = new BatchQuery(new BatchStore());
  });

  it('should create an instance', () => {
    expect(query).toBeTruthy();
  });
});
