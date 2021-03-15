import { Injectable } from '@angular/core';
import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private appStore: AppStore) {}

  // Akita
  updateLoading(loading: boolean) {
    this.appStore.update({ loading });
  }

  resetStore() {
    this.appStore.reset();
  }
}
