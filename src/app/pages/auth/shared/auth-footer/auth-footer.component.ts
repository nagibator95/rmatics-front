import {Component} from '@angular/core';

import {TELEGRAM_LINK} from '../../../../core/constants/links';

@Component({
    selector: 'app-auth-footer',
    templateUrl: './auth-footer.component.html',
    styleUrls: ['./auth-footer.component.scss'],
})
export class AuthFooterComponent {
    telegramLink = TELEGRAM_LINK;
}
