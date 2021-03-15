import { Observable } from 'rxjs';
import { Entity } from '../../../utility/model/entity.model';
import { IdValueObject } from '../../../utility/model/id-value-object.model';
import { FirestoreQueryBuilder } from '../builder/firestore-query.builder';

export abstract class IFirestoreService {
  abstract getCollection<T extends Entity>(collection: string, builder: FirestoreQueryBuilder<T>): Observable<any[]>;

  abstract getDocument<T extends IdValueObject>(collection: string, id: T): Observable<any | undefined>;

  abstract setDocument(collection: string, data: object): Observable<void>;

  abstract deleteDocument<T extends IdValueObject>(collection: string, id: T): Observable<void>;

  abstract generateId(): string;
}
