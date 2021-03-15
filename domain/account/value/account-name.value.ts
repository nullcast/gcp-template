import { ArgumentNullException } from '../../../utility/exception/argument-null.exception';
import { ArgumentException } from '../../../utility/exception/argument.exception';
import '../../../utility/extension/string.extension';
import { ValueObject } from '../../../utility/model/value-object.model';
import { AccountNameProps } from '../props/account-name.props';

export class AccountName extends ValueObject<AccountNameProps> {
  static create(props: AccountNameProps): AccountName {
    if (props.first === null || props.last === null) {
      throw new ArgumentNullException();
    }
    if (props.first.bytes() === 0 || props.first.bytes() > 64 || props.last.bytes() === 0 || props.last.bytes() > 64) {
      throw new ArgumentException();
    }
    return new AccountName(props);
  }

  get first(): string {
    return this._value.first;
  }
  get last(): string {
    return this._value.first;
  }
}
