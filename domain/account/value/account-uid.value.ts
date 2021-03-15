import { ArgumentNullException } from '../../../utility/exception/argument-null.exception';
import { IdValueObject } from '../../../utility/model/id-value-object.model';

export class AccountUid extends IdValueObject {
  static create(value: string): AccountUid {
    if (value === null) {
      throw new ArgumentNullException();
    }
    return new AccountUid(value);
  }
}
