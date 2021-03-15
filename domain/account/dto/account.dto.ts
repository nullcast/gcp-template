import { EAccountAuthority } from '../enum';
import { AccountNameProps } from '../props/account-name.props';

export interface AccountDto {
  id: string;
  uid: string;
  email: string;
  name: AccountNameProps;
  authority: EAccountAuthority;
  createdAt: Date;
  updatedAt: Date;
}
