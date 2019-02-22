import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface Restrictions {
  time: string;
  realTime: string;
  memory: string;
}

interface Conditions {
  description: string[];
  inputData: string[];
  outputData: string[];
  testExamples: {
    title: string;
    text: string;
  }[];
  dataExamples: {
    input: string[];
    output: string[];
  };
}

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionsComponent {
  @Input() restrictions!: Restrictions;
  @Input() conditions!: Conditions;

  get minDataLines() {
    return Math.max(this.conditions.dataExamples.input.length, this.conditions.dataExamples.output.length);
  }
}
