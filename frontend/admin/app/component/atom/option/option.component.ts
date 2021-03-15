import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faEllipsisH } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent implements OnInit {
  faEllipsisH = faEllipsisH;

  constructor() {}

  ngOnInit(): void {}
}
