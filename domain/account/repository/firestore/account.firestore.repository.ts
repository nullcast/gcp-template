import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFirestoreService } from '../../../../lib/gcp/service/firestore.service';
import { Timestamp } from '../../../../utility/model/timestamp.value';
import { Account } from '../../entity';
import { AccountId } from '../../value';
import { IAccountRepository } from '../account.repository';

export class AccountFirestoreRepository implements IAccountRepository {
  private static readonly collectionId = 'account';
  constructor(private readonly firestoreService: IFirestoreService) {}
  select(id: AccountId): Observable<Account> {
    return this.firestoreService.getDocument(AccountFirestoreRepository.collectionId, id);
  }
  insert(item: Account): Observable<Account> {
    item.createdAt = Timestamp.createByDate(new Date());
    return this.firestoreService.setDocument(AccountFirestoreRepository.collectionId, item).pipe(map(() => item));
  }
  update(item: Account): Observable<Account> {
    const currentMillsecUnixTimestap = +new Date();
    item.updatedAt = Timestamp.createByMillsec(currentMillsecUnixTimestap);
    return this.firestoreService.setDocument(AccountFirestoreRepository.collectionId, item).pipe(map(() => item));
  }
  delete(id: AccountId): Observable<void> {
    return this.firestoreService.deleteDocument(AccountFirestoreRepository.collectionId, id);
  }
  generateId(): AccountId {
    return AccountId.create(this.firestoreService.generateId());
  }
}
