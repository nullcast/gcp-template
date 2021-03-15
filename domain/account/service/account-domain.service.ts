import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountDto } from '../dto/account.dto';
import { Account } from '../entity';
import { EAccountAuthority } from '../enum';
import { AccountNameProps } from '../props/account-name.props';
import { IAccountRepository } from '../repository/account.repository';
import { AccountAuthority, AccountEmail, AccountName } from '../value';

export class AccountDomainService {
  constructor(private readonly accountRepository: IAccountRepository) {}
  insertAccount(email: string, name: AccountNameProps, authority: EAccountAuthority): Observable<AccountDto> {
    const account = new Account(this.accountRepository.generateId());
    account.email = AccountEmail.create(email);
    account.name = AccountName.create(name);
    account.authority = AccountAuthority.create(authority);
    return this.accountRepository.insert(account).pipe(map(item => this.convertDto(item)));
  }

  private convertDto(account: Account): AccountDto {
    return account.map() as AccountDto;
  }
}
