import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {ITest} from '../../../../core/stores/contest/types/contest.types';

interface IStatisticsConditions {
    timeLimit: number;
    memoryLimit: number;
    content: string;
}

interface IParamValues {
    name: string;
    condition?: number | string;
    value?: number | string;
    testId?: number;
}

interface IStatistics {
    firstFailedTest: IParamValues;
    realTime: IParamValues;
    memory: IParamValues;
}

type ParamField = 'realTime' | 'memory';

const statisticsDefault: IStatistics = {
    firstFailedTest: {name: 'Первый  непройденный тест'},
    realTime: {name: 'Время'},
    memory: {name: 'Память'},
};

const getParams = (
    memo: IStatistics,
    test: ITest,
    field: ParamField,
    condition: number,
) => {
    const isBigger =
        !isNaN(memo[field].value as number) &&
        (memo[field].value as number) > test[field];

    return {
        name: memo[field].name,
        condition: condition,
        value: isBigger ? memo[field].value : test[field],
        testId: isBigger ? memo[field].testId : test.id,
    };
};

const reduceStatistics = (conditions: IStatisticsConditions) => (
    memo: IStatistics,
    test: ITest,
    index: number,
) => {
    const realTime = getParams(memo, test, 'realTime', conditions.timeLimit);
    const memory = getParams(memo, test, 'memory', conditions.memoryLimit);

    return {
        realTime,
        memory,
        firstFailedTest: {...memo.firstFailedTest, testId: index},
    };
};

const handleSuccess = (statistics: IStatistics, tests: ITest[]): IStatistics => {
    for (let i = 0; i < tests.length; i++) {
        if (tests[i].status !== 'OK') {
            statistics.firstFailedTest = {
                ...statistics.firstFailedTest,
                condition: '-',
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
    @Input() tests: ITest[] = [];
    @Input() timeLimit: number;
    @Input() memoryLimit: number;
    @Input() content: string;

    conditions: IStatisticsConditions;

    statistics: IStatistics;

    ngOnInit() {
        this.conditions = {
            timeLimit: this.timeLimit,
            memoryLimit: this.memoryLimit,
            content: this.content,
        };

        this.statistics = this.tests.reduce(
            reduceStatistics(this.conditions),
            statisticsDefault,
        );
        this.statistics = handleSuccess(this.statistics, this.tests);
    }
}
