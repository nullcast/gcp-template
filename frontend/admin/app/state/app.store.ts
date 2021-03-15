import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { EAccountAuthority } from 'domain/account';
import { IOption } from 'frontend/lib/model/option.model';
import { EAccountAuthorityLabel } from '../enum/account-authority.enum';

export interface AppState {
  authorityOptions: IOption<EAccountAuthority, EAccountAuthorityLabel>[];
  loading: boolean;
}

export function createInitialState(): AppState {
  return {
    authorityOptions: [
      { value: EAccountAuthority.MEMBER, label: EAccountAuthorityLabel.member },
      { value: EAccountAuthority.ADMIN, label: EAccountAuthorityLabel.admin }
    ],
    loading: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(createInitialState());
  }
}
