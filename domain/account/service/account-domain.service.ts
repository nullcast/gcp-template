import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Timestamp } from '../../../utility/model/timestamp.value';
import { FirestoreQueryBuilder } from '../../../lib/gcp/builder/firestore-query.builder';
import { AccountDto } from '../dto/account.dto';
import { Account } from '../entity';
import { EAccountAuthority } from '../enum';
import { AccountNameProps } from '../props/account-name.props';
import { IAccountRepository } from '../repository/account.repository';
import { AccountAuthority, AccountEmail, AccountId, AccountName, AccountUid } from '../value';

export class AccountDomainService {
  constructor(private readonly accountRepository: IAccountRepository) {}

  insertAccount(email: string, name: AccountNameProps, authority: EAccountAuthority): Observable<AccountDto> {
    const account = new Account(this.accountRepository.generateId());
    account.email = AccountEmail.create(email);
    account.name = AccountName.create(name);
    account.authority = AccountAuthority.create(authority);
    account.createdAt = Timestamp.createByMillsec(Date.now());
    account.updatedAt = Timestamp.createByMillsec(Date.now());
    return this.accountRepository.insert(account).pipe(map(item => this.convertDto(item)));
  }

  selectAccount(uid: string) {
    return this.accountRepository.selectAll(new FirestoreQueryBuilder<Account>().equalWhere('uid', uid)).pipe(
      take(1),
      map(item => this.convertDto(item))
    );
  }

  selectAllAccount(builder = new FirestoreQueryBuilder<Account>()) {
    return this.accountRepository.selectAll(builder).pipe(map(item => this.convertDto(item)));
  }

  updateAccount(accountDto: AccountDto) {
    const account = new Account(AccountId.create(accountDto.id));
    account.uid = AccountUid.create(accountDto.uid);
    account.email = AccountEmail.create(accountDto.email);
    account.name = AccountName.create(accountDto.name);
    account.authority = AccountAuthority.create(accountDto.authority);
    account.createdAt = Timestamp.createByDate(accountDto.createdAt);
    account.updatedAt = Timestamp.createByMillsec(Date.now());
    return this.accountRepository.update(account).pipe(map(item => this.convertDto(item)));
  }

  deleteAccount(accountId: string) {
    return this.accountRepository.delete(AccountId.create(accountId));
  }

  private convertDto(account: Account): AccountDto {
    return Account.allFields.reduce((p, key) => {
      if (account[key] === undefined) {
        return p;
      }
      const value = account[key] as { value: any };
      p[key] = value.value;
      return p;
    }, {} as AccountDto);
  }
}
