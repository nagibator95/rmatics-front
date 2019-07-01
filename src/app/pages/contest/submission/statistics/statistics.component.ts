import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import { Test } from '../../contest.types';

interface StatisticsConditions {
  timeLimit: number;
  memoryLimit: number;
  content: string;
}

interface ParamValues {
  name: string;
  condition?: number | string;
  value?: number | string;
  testId?: number;
}

interface Statistics {
  firstFailedTest: ParamValues;
  realTime: ParamValues;
  memory: ParamValues;
}

type ParamField = 'realTime' | 'memory';

const statisticsDefault: Statistics = {
  firstFailedTest: { name: 'Первый  непройденный тест'},
  realTime: { name: 'Время'},
  memory: { name: 'Память'},
};

const getParams = (memo: Statistics, test: Test, field: ParamField, condition: number) => {
  const isBigger = !isNaN(memo[field].value as number) && (memo[field].value as number) > test[field];

  return {
      name: memo[field].name,
      condition: condition,
      value: isBigger ? memo[field].value : test[field],
      testId: isBigger ? memo[field].testId : test.id,
    };
};

const reduceStatistics = (conditions: StatisticsConditions) => (memo: Statistics, test: Test, index: number) => {
  const realTime = getParams(memo, test, 'realTime', conditions.timeLimit);
  const memory = getParams(memo, test, 'memory', conditions.memoryLimit);

  return { realTime, memory, firstFailedTest: { ...memo.firstFailedTest, testId: index }};
};

const handleSuccess = (statistics: Statistics, tests: Test[], conditions: StatisticsConditions): Statistics => {
  for (let i = 0; i < tests.length; i++) {
    if (tests[i].status !== 'OK') {
      statistics.firstFailedTest = {
        ...statistics.firstFailedTest,
        condition: conditions.content,
        value: tests[i].status,
        testId: tests[i].id,
      };

      return statistics;
    }
  }

  statistics.firstFailedTest = statisticsDefault.firstFailedTest;

  return statistics;
};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  statisticsFields = ['firstFailedTest', 'realTime', 'memory'];
  @Input() tests: Test[] = [];
  @Input() timeLimit: number;
  @Input() memoryLimit: number;
  @Input() content: string;

  conditions: StatisticsConditions;

  statistics: Statistics;

  ngOnInit() {
    this.conditions = {
      timeLimit: this.timeLimit,
      memoryLimit: this.memoryLimit,
      content: this.content,
    };

    this.statistics = this.tests.reduce(reduceStatistics(this.conditions), statisticsDefault);
    this.statistics = handleSuccess(this.statistics, this.tests, this.conditions);
  }
}
