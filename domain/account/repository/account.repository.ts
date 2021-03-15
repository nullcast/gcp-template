import { Observable } from 'rxjs';
import { FirestoreQueryBuilder } from '../../../lib/gcp/builder/firestore-query.builder';
import { IRepository } from '../../../utility/repository/repository';
import { Account } from '../entity';
import { AccountId } from '../value';

export abstract class IAccountRepository extends IRepository<AccountId, Account> {
  abstract selectAll(builder: FirestoreQueryBuilder<Account>): Observable<Account>;
}
