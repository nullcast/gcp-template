import { inject } from 'inversify';
import { from, Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { FirestoreQueryBuilder } from '../../../../lib/gcp/builder/firestore-query.builder';
import { IFirestoreService } from '../../../../lib/gcp/service/firestore.service';
import { Entity } from '../../../../utility/model/entity.model';
import { IdValueObject } from '../../../../utility/model/id-value-object.model';
import { TYPES } from '../../types';
import { provideSingleton } from '../../util/provide-singleton';

@provideSingleton(FirestoreService)
export class FirestoreService implements IFirestoreService {
  constructor(@inject(TYPES.FIRESTORE_CLIENT) private firestore: FirebaseFirestore.Firestore) {}

  getCollection<T extends Entity>(collection: string, builder: FirestoreQueryBuilder<T>): Observable<any[]> {
    return from((builder.build(this.firestore.collection(collection)) as FirebaseFirestore.Query).get()).pipe(
      mergeMap(snapshot => snapshot.docs),
      map(document => ({
        ...document.data(),
        id: document.id
      })),
      toArray()
    );
  }

  getDocument<T extends IdValueObject>(collection: string, id: T): Observable<any | undefined> {
    return from(this.firestore.doc(`${collection}/${id.value}`).get()).pipe(map(document => document.data()));
  }

  setDocument<T>(collection: string, data: T): Observable<any> {
    const id = (data as any).id;
    return from(this.firestore.doc(`${collection}/${id}`).set(data, { merge: true }));
  }

  deleteDocument<T extends IdValueObject>(collection: string, id: T): Observable<void> {
    return from(this.firestore.doc(`${collection}/${id.value}`).delete()).pipe(map(_ => undefined));
  }

  generateId(): string {
    return this.firestore.collection('_').doc().id;
  }
}
