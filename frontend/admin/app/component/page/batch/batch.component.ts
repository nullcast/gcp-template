import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BatchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
