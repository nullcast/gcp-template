import { IRepository } from '../../../utility/repository/repository';
import { Account } from '../entity';
import { AccountId } from '../value';

export abstract class IAccountRepository extends IRepository<AccountId, Account> {}
