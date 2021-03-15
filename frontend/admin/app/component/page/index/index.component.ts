import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private query: IndexQuery, private service: IndexService) {
    this.store$ = this.query.select();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.service.resetStore();
  }

  error() {
    return [].find(_ => false).id;
  }

  error404() {
    console.log('Error 404');
    this.service.getStatus(404).subscribe({
      next: item => console.log(item),
      error: () => console.log('hi')
    });
  }

  error500() {
    console.log('Error 500');
    this.service.getStatus(500).subscribe({
      next: item => console.log(item),
      error: () => {}
    });
  }
}
