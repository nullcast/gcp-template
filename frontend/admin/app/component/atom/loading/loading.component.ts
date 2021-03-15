import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faCircleNotch } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit {
  faCircleNotch = faCircleNotch;

  constructor() {}

  ngOnInit(): void {}
}
