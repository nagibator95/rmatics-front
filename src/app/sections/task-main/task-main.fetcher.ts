import { interval } from 'rxjs';

export interface SubmissionApi {
  id: number;
  user: {
    id: number,
    firstname: string,
    lastname: string,
  };
  problem: {
    id: number,
    name: string,
  };
  ejudge_status: string;
  create_time: number;
  ejudge_language_id: number;
  ejudge_test_num: number;
  ejudge_score: number;
}

const statuses = ['OK', 'RJ', 'AC', 'SV', 'IG', 'CE', 'DQ', 'PT', 'PD', 'RT', 'TL', 'PE', 'WA', 'CF', 'ML', 'SE', 'RU', 'CG', 'AW'];

const submissions: SubmissionApi[] = [];

interval(5000).subscribe(() => {
  submissions.forEach(item => {
    item.ejudge_status = statuses[Math.floor(Math.random() * statuses.length)];
    item.ejudge_score = Math.floor(Math.random() * Math.floor(100));
  });
});

export const addSubmission = (problemId: number, _solution: string, languageId: number) => {
  const newSubmission: SubmissionApi = {
    id: submissions.length + 1,
    user: {
      id: 1,
      firstname: 'First',
      lastname: 'Last',
    },
    problem: {
      id: problemId,
      name: '',
    },
    create_time: new Date().getTime(),
    ejudge_status: 'PD',
    ejudge_language_id: languageId,
    ejudge_test_num: 0,
    ejudge_score: 0,
  };

  submissions.push(newSubmission);
};

export const getSubmissions = (problemId: number) => submissions.filter(item => item.problem.id === problemId);
