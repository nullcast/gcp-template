import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { faFlag, faUser } from '@fortawesome/pro-duotone-svg-icons';
import { Observable } from 'rxjs';
import { ModalService } from './component/modal/state/modal.service';
import { AppQuery } from './state/app.query';
import { AppService } from './state/app.service';
import { AppState } from './state/app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  store$: Observable<AppState>;
  faFlag = faFlag;
  faUser = faUser;

  constructor(private query: AppQuery, private service: AppService, private modalService: ModalService) {
    this.store$ = this.query.select();
  }

  ngOnDestroy() {
    this.service.resetStore();
  }
}
