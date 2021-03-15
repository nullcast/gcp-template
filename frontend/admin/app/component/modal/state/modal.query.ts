import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ModalState, ModalStore } from './modal.store';

@Injectable({ providedIn: 'root' })
export class ModalQuery extends Query<ModalState> {
  constructor(protected store: ModalStore) {
    super(store);
  }
}
