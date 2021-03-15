import { Observable } from 'rxjs';
import { Entity } from 'utility/model/entity.model';
import { IdValueObject } from 'utility/model/id-value-object.model';

export abstract class IRepository<T extends IdValueObject, U extends Entity> {
  abstract select(id: T): Observable<U>;

  abstract insert(item: U): Observable<U>;

  abstract update(item: U): Observable<U>;

  abstract delete(id: T): Observable<void>;

  abstract generateId(): T;
}
