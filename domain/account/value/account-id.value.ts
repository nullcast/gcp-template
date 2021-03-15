import 'utility/extension/string.extension';
import { ArgumentNullException } from '../../../utility/exception/argument-null.exception';
import { IdValueObject } from '../../../utility/model/id-value-object.model';

export class AccountId extends IdValueObject {
  static create(value: string): AccountId {
    if (value === null) {
      throw new ArgumentNullException();
    }
    return new AccountId(value);
  }
}
