import { ArgumentNullException } from '../../../utility/exception/argument-null.exception';
import { PrimitiveValueObject } from '../../../utility/model/primitive-value-object.model';
import { EAccountAuthority } from '../enum/account-authority.enum';

export class AccountAuthority extends PrimitiveValueObject<EAccountAuthority> {
  static create(value: EAccountAuthority): AccountAuthority {
    if (value === null) {
      throw new ArgumentNullException();
    }
    return new AccountAuthority(value);
  }
}
