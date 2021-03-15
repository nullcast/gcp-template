import { Injectable } from '@angular/core';
import { BinService } from 'frontend/lib/service/bin.service';
import { IndexStore } from './index.store';

@Injectable({ providedIn: 'root' })
export class IndexService {
  constructor(private indexStore: IndexStore, private binService: BinService) {}

  // Bin
  getStatus(status: number) {
    return this.binService.getStatus(status);
  }

  // Akita
  updateLoading(loading: boolean) {
    this.indexStore.update({ loading });
  }

  resetStore() {
    this.indexStore.reset();
  }
}
