import { ArgumentNullException } from '../../../utility/exception/argument-null.exception';
import { ArgumentException } from '../../../utility/exception/argument.exception';
import { PrimitiveValueObject } from '../../../utility/model/primitive-value-object.model';

export class AccountEmail extends PrimitiveValueObject<string> {
  static reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

  static create(value: string): AccountEmail {
    if (value === null) {
      throw new ArgumentNullException();
    }
    if (!AccountEmail.reg.test(value)) {
      throw new ArgumentException();
    }
    const [local, domain] = value.split('@');
    if (local.length > 64 || domain.length > 253 || value.length > 254) {
      throw new ArgumentException();
    }

    return new AccountEmail(value);
  }
}
