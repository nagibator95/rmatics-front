import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {RadioButton} from '../ui/radio-group/radio-group.component';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestorePasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  restorePasswordForm: FormGroup;
  byLogin = true;
  byEmail = false;

  radioButtons: RadioButton[] = [
    {
      text: 'По логину',
    },
    {
      text: 'По email',
    },
  ];

  ngOnInit() {
    this.restorePasswordForm = this.formBuilder.group(
      {
        loginOrEmail: ['', [
          Validators.required,
        ]],
      },
    );
  }
}
