import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { FirestoreQueryBuilder } from 'gcp/builder/firestore-query.builder';
import { IFirestoreService } from 'gcp/service/firestore.service';
import { from, Observable } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { Entity } from 'utility/model/entity.model';
import { IdValueObject } from 'utility/model/id-value-object.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements IFirestoreService {
  constructor(private angularFirestore: AngularFirestore) {}

  getCollection<T extends Entity>(collection: string, builder: FirestoreQueryBuilder<T>): Observable<T[]> {
    return this.angularFirestore
      .collection<T>(collection, ref => builder.build(ref as firebase.firestore.CollectionReference<T>))
      .valueChanges({ idField: 'id' });
  }

  getDocument<T extends IdValueObject, U extends Entity>(collection: string, id: T): Observable<U | undefined> {
    return this.angularFirestore.doc<U>(`${collection}/${id.value}`).valueChanges();
  }

  setDocument(collection: string, data: object): Observable<void> {
    // Dirty code
    const id = (data as any).id;
    return from(this.angularFirestore.doc(`${collection}/${id}`).set(data, { merge: true }));
  }

  deleteDocument<T extends IdValueObject>(collection: string, id: T): Observable<void> {
    return from(this.angularFirestore.doc<T>(`${collection}/${id.value}`).delete());
  }

  runTransaction<T extends Entity>(updateFunction: (transaction: firebase.firestore.Transaction) => Promise<T>) {
    return from(this.angularFirestore.firestore.runTransaction<T>(updateFunction));
  }

  generateId(): string {
    return this.angularFirestore.createId();
  }
}
