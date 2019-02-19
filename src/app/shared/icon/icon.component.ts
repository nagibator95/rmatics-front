import { Component, Input } from '@angular/core';
// import '@types/node';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() icon = '';
  @Input() width = '100%';
  @Input() height = '100%';

  constructor() {}
}
