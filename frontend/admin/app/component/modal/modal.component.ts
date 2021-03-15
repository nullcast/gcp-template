import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalQuery } from './state/modal.query';
import { ModalService } from './state/modal.service';
import { ModalState } from './state/modal.store';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('inner', { read: ViewContainerRef, static: false }) vcr;

  store$: Observable<ModalState>;
  component = null;

  constructor(private service: ModalService, private query: ModalQuery) {
    this.store$ = this.query.select();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.service.vcr = this.vcr;
  }

  ngOnDestroy() {
    this.service.resetStore();
  }

  close() {
    this.service.close();
  }

  submit() {
    this.service.submit();
  }
}
