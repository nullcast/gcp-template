import { EMPTY, Observable } from 'rxjs';
import { distinct, expand, map, mergeMap, take } from 'rxjs/operators';
import { AccountNotFoundError } from '../../exception/account-notfound.exception';
import { FirestoreQueryBuilder } from '../../../../lib/gcp/builder/firestore-query.builder';
import { IFirestoreService } from '../../../../lib/gcp/service/firestore.service';
import { Timestamp } from '../../../../utility/model/timestamp.value';
import { Account } from '../../entity';
import { AccountAuthority, AccountEmail, AccountId, AccountName } from '../../value';
import { IAccountRepository } from '../account.repository';

export class AccountFirestoreRepository implements IAccountRepository {
  private static readonly collectionId = 'account';

  constructor(private readonly firestoreService: IFirestoreService) {}

  select(id: AccountId): Observable<Account> {
    return this.firestoreService.getDocument(AccountFirestoreRepository.collectionId, id).pipe(
      map(item => {
        if (!item) {
          throw new AccountNotFoundError('account is not found');
        }
        return this.convertToEntity(item);
      })
    );
  }

  selectAll(builder: FirestoreQueryBuilder<Account>): Observable<Account> {
    return this.firestoreService.getCollection(AccountFirestoreRepository.collectionId, builder).pipe(
      take(1),
      expand(items =>
        items.length
          ? this.firestoreService
              .getCollection(AccountFirestoreRepository.collectionId, builder.startAfter(items[items.length - 1].id).limit(100))
              .pipe(take(1))
          : EMPTY
      ),
      mergeMap(items => items),
      distinct(item => item.id),
      map(item => this.convertToEntity(item))
    );
  }

  insert(item: Account): Observable<Account> {
    item.createdAt = Timestamp.createByDate(new Date());
    return this.firestoreService.setDocument(AccountFirestoreRepository.collectionId, this.convertToMap(item)).pipe(map(() => item));
  }

  update(account: Account): Observable<Account> {
    const currentMillsecUnixTimestap = +new Date();
    account.updatedAt = Timestamp.createByMillsec(currentMillsecUnixTimestap);
    return this.firestoreService.getDocument(AccountFirestoreRepository.collectionId, account.id).pipe(
      mergeMap(item => {
        if (!item) {
          throw new AccountNotFoundError('account is not found');
        }
        return this.firestoreService.setDocument(AccountFirestoreRepository.collectionId, this.convertToMap(account));
      }),
      map(_ => account)
    );
  }

  delete(id: AccountId): Observable<void> {
    return this.firestoreService.deleteDocument(AccountFirestoreRepository.collectionId, id);
  }

  generateId(): AccountId {
    return AccountId.create(this.firestoreService.generateId());
  }

  private convertToMap(account: Account): object {
    return Account.allFields.reduce((p, key) => {
      if (account[key] === undefined) {
        return p;
      }
      const value = account[key] as { value: any };
      p[key] = value.value;
      return p;
    }, {});
  }

  private convertToEntity(item: any) {
    const account = new Account(AccountId.create(item.id));
    account.email = AccountEmail.create(item.email);
    account.name = AccountName.create(item.name);
    account.authority = AccountAuthority.create(item.authority);
    account.createdAt = Timestamp.createByMillsec(item.createdAt.seconds * 1000);
    account.updatedAt = Timestamp.createByMillsec(item.updatedAt.seconds * 1000);
    return account;
  }
}
