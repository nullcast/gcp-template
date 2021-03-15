// tslint:disable: variable-name
import { Entity } from '../../../utility/model/entity.model';
import { Timestamp } from '../../../utility/model/timestamp.value';
import { AccountAuthority } from '../value/account-authority.value';
import { AccountEmail } from '../value/account-email.value';
import { AccountId } from '../value/account-id.value';
import { AccountName } from '../value/account-name.value';
import { Column, getColumns } from '../../../utility/decorator/entity/column.decorator';

export class Account implements Entity {
  @Column()
  readonly id: AccountId;
  @Column()
  email: AccountEmail;
  @Column()
  name: AccountName;
  @Column()
  authority: AccountAuthority;
  @Column()
  createdAt: Timestamp;
  @Column()
  updatedAt: Timestamp;

  constructor(id: AccountId) {
    this.id = id;
  }

  // Dirty code
  static get allFields(): (keyof Account)[] {
    return getColumns(new Account(AccountId.create('')));
  }

  equals(value: Account): boolean {
    return this.id.equals(value.id);
  }
}
