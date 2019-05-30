import {languages} from '../../../../shared/constants';
import {StatementApi} from '../../../../shared/types/contest.types';
import {PackageStatus, PackageStatusEnum, ProblemApi, Submission, SubmissionApi} from '../types/contest.types';

const formatSubmission = (submission: SubmissionApi, index: number) => {
  const lang = languages.find(language => language.id === submission.ejudge_language_id);

  return {
    index: index + 1,
    userName: `${submission.user.firstname} ${submission.user.lastname}`,
    id: submission.id,
    date: submission.create_time,
    lang: lang ? lang : languages[0],
    tests: submission.ejudge_test_num,
    score: submission.ejudge_score,
    href: '',
    status: PackageStatusEnum[submission.ejudge_status] as PackageStatus,
  } as Submission;
};

const formatContest = (contest: StatementApi, courseId: number) => ({
  id: contest.id,
  name: contest.name,
  summary: contest.summary,
  problems: contest.problems.map(item => ({
    letter: 'abcdefghijklmnopqrstuvwxyz'[item.rank - 1],
    name: item.name,
    id: item.id,
    rank: item.rank,
    href: `/contest/${courseId}/problem/${item.id}`,
  })),
});

const formatProblem = (problem: ProblemApi) => ({
  id: problem.id,
  name: problem.name,
  content: problem.content,
  timeLimit: problem.timelimit,
  memoryLimit: problem.memorylimit,
  description: problem.description,
  input: problem.sample_tests_json ? JSON.parse(problem.sample_tests_json.input) : '',
  correct: problem.sample_tests_json ? JSON.parse(problem.sample_tests_json.correct) : '',
  outputOnly: problem.output_only,
});
