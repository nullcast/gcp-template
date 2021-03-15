import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IndexQuery } from './state/index.query';
import { IndexService } from './state/index.service';
import { IndexState } from './state/index.store';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {
  store$: Observable<IndexState>;

  constructor(public query: IndexQuery, private service: IndexService) {
    this.store$ = this.query.select();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.service.resetStore();
  }

  generateSampleAccount() {
    this.service
      .sampleAccount()
      .pipe(tap(i => console.log(i)))
      .subscribe({ complete: () => console.log('done') });
  }

  generateSampleUsers() {
    this.service
      .sampleUsers()
      .pipe(tap(i => console.log(i)))
      .subscribe({ complete: () => console.log('done') });
  }

  generateSampleService() {
    this.service
      .sampleService()
      .pipe(tap(i => console.log(i)))
      .subscribe({ complete: () => console.log('done') });
  }
}
