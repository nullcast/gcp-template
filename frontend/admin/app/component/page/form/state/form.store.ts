import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface FormState {
  key: string;
}

export function createInitialState(): FormState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'form' })
export class FormStore extends Store<FormState> {
  constructor() {
    super(createInitialState());
  }
}
