import { Observable } from 'rxjs';
import { ModalContent } from 'src/app/modal/modal-content';
import { getDate } from 'src/app/utils/getDate';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PackageStatus, Statistics, Submission, Test } from '../contest.types';

interface SubmissionComponentInput {
  submission: Observable<Submission | undefined>;
  isFetching: Observable<boolean>;
}

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionComponent extends ModalContent<SubmissionComponentInput> {
  submission = this.data.submission;
  isFetching = this.data.isFetching;

  getDate = getDate;

  tabs = [
    {
      text: 'Код посылки',
      id: 'submission_code',
      current: true,
    }, {
      text: 'Протокол',
      id: 'protocol',
      current: false,
    },
  ];

  activeTab: string = this.tabs[0].id;

  code = [
    '#include<iostream>',
    '#include<queue>',
    '#include<map>',
    '#define point pair<int, int>',
    '#define x first',
    '#define y second',
    '',
    'using namespace std;',

    'const int N = 2000,',
    '			inf = 2e9;',
    '',
    'int n, m;',
    'int s, t;',
    'int c[N] [N], f[N] [N];',
    'map<point, int> p;',
    '',
    'int get_v(point a){',
    '    if(p.find(a) == p.end())',
    '		p[a] = p.size()-1;',
    '     return p[a];',
  ].join('\n');

  compiler = [
    'Free Pascal Compiler version 3.0.2 [2017/03/22] for i386\n',
    'Copyright (c) 1993-2017 by Florian Klaempfl and others\n',
    'Target OS: Linux for i386\n',
    'Compiling 771347 .pas\n',
    '771347 .pas (1,4) Fatal: Syntax error, «BEGIN» expected but «identifier SSH» found\n',
    'Fatal: Compilation aborted\n',
    'Error: /usr/bin/ppc386 returned an error exitcode\n',
  ];

  statistics: Statistics[] = [
    {
      param: 'Первый  непройденный тест',
    }, {
      param: 'Время',
      condition: '1 сек',
      value: '0',
      test: 1,
    }, {
      param: 'Первый  непройденный тест',
      condition: '5 сек',
      value: '0.001 мс',
      test: 1,
    }, {
      param: 'Первый  непройденный тест',
      condition: '512 МБ',
      value: '1810432 ??',
      test: 1,
    },
  ];

  tests: Test[] = Array(5).fill(null).map((_item, index) => ({
    id: index + 1,
    status: 'OK' as PackageStatus,
    time: 0,
    realTime: 0.001,
    memory: 1810432,
  }));
}
