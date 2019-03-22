import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-restore-password-form',
  templateUrl: './restore-password-form.component.html',
  styleUrls: ['./restore-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestorePasswordFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
