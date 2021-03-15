import { Injectable } from '@angular/core';
import { FormStore } from './form.store';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(private formStore: FormStore) {}
}
