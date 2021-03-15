import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../modal/state/modal.service';

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalLayoutComponent implements OnInit {
  @Input() loading = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  close() {
    this.modalService.close();
  }
}
