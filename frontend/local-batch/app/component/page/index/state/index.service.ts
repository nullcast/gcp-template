import { Injectable } from '@angular/core';
import { BinService } from 'frontend/lib/service/bin.service';
import { DummyDataGenerateUsecase } from 'frontend/local-batch/app/usecase/dummy-data-generate.usecase';
import { IndexStore } from './index.store';

@Injectable({ providedIn: 'root' })
export class IndexService {
  constructor(private indexStore: IndexStore, private binService: BinService, private dummyDataGenerateUsecase: DummyDataGenerateUsecase) {}

  // Bin
  getStatus(status: number) {
    return this.binService.getStatus(status);
  }

  sampleAccount() {
    return this.dummyDataGenerateUsecase.generateSampleAccount();
  }

  sampleUsers() {
    return this.dummyDataGenerateUsecase.generateSampleUsers();
  }

  sampleService() {
    return this.dummyDataGenerateUsecase.generateSampleService();
  }

  // Akita
  updateLoading(loading: boolean) {
    this.indexStore.update({ loading });
  }

  resetStore() {
    this.indexStore.reset();
  }
}
