import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Test } from '../../contest.types';

interface StatisticsConditions {
  timeLimit: number;
  memoryLimit: number;
}

interface ParamValues {
  name: string;
  condition?: number;
  value?: number;
  testId?: number;
}

interface Statistics {
  firstFailedTest: ParamValues,
  time: ParamValues,
  memory: ParamValues,
}

type ParamField = 'time' | 'memory';

const statisticsDefault: Statistics = {
  firstFailedTest: { name: 'Первый  непройденный тест'},
  time: { name: 'Время'},
  memory: { name: 'Память'},
}

const getParams = (memo: Statistics, test: Test, field: ParamField, condition: number) =>
  !isNaN(memo[field].value as number) && (memo[field].value as number) > test[field]
    ? memo.memory
    : {
      name: memo[field].name,
      condition: condition,
      value: test[field],
      testId: test.id,
    }

const reduceStatistics = (conditions: StatisticsConditions) => (memo: Statistics, test: Test, index: number) => {
  const time = getParams(memo, test, 'time', conditions.timeLimit);
  const memory = getParams(memo, test, 'memory', conditions.memoryLimit);

  return { time, memory, firstFailedTest: { ...memo.firstFailedTest, testId: index }}
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {
  @Input() tests: Test[] = [];
  @Input() timeLimit: number = 0;
  @Input() memoryLimit: number = 0;

  conditions: StatisticsConditions = {
    timeLimit: this.timeLimit,
    memoryLimit: this.memoryLimit,
  }

  statistics: Statistics = this.tests.reduce(reduceStatistics(this.conditions), statisticsDefault);
  statisticsFields = ['firstFailedTest', 'time', 'memory'];
}
