import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
