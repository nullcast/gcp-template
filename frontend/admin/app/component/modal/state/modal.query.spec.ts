import { ModalQuery } from './modal.query';
import { ModalStore } from './modal.store';

describe('ModalQuery', () => {
  let query: ModalQuery;

  beforeEach(() => {
    query = new ModalQuery(new ModalStore());
  });

  it('should create an instance', () => {
    expect(query).toBeTruthy();
  });
});
