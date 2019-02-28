import { Injectable } from '@angular/core';

import { MOCK } from './mock-data';
import { addSubmission, getSubmissions } from './task-main.fetcher';

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

  constructor() {
  }
  addSubmission = addSubmission;
  getSubmissions = getSubmissions;

  getData = (): { restrictions: Restrictions, conditions: Conditions } => MOCK;
}
