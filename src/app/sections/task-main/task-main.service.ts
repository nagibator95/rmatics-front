import { Injectable } from '@angular/core';

import { MOCK } from './mock-data';

export interface Restrictions {
  time: string;
  memory: string;
}

export interface Conditions {
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

@Injectable({
  providedIn: 'root',
})
export class TaskMainService {
  constructor() { }

  getData = (): { restrictions: Restrictions, conditions: Conditions } => MOCK;
}
