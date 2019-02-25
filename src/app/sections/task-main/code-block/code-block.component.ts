import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  @Input() minLines = 1;
  @Input() blockTitle?: string;
  @Input() code!: string[];

  get lines() {
    return Array(Math.max(this.minLines, this.code.length));
  }
}
