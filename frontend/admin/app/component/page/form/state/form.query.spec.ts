import { FormQuery } from './form.query';
import { FormStore } from './form.store';

describe('FormQuery', () => {
  let query: FormQuery;

  beforeEach(() => {
    query = new FormQuery(new FormStore());
  });

  it('should create an instance', () => {
    expect(query).toBeTruthy();
  });
});
