import { EAccountAuthority } from '../enum';
import { AccountNameProps } from '../props/account-name.props';

export interface AccountDto {
  id: string;
  email: string;
  name: AccountNameProps;
  authority: EAccountAuthority;
}
