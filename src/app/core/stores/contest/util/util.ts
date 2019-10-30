import {
    IRunComment,
    IRunCommentApi,
    IRunProtocol,
    IRunProtocolApi,
    IRunSource,
    IRunSourceApi,
} from '../types/contest.types';
import {languages} from '../../../../shared/constants';
import {IStatementApi} from '../../../../shared/types/contest.types';
import {
    IContest,
    PackageStatus,
    PackageStatusEnum,
    IProblem,
    IProblemApi,
    ISubmission,
    ISubmissionApi,
} from '../types/contest.types';

export const formatSubmission = (
    submission: ISubmissionApi,
    index: number,
): ISubmission => {
    const lang = languages.find(
        language => language.id === submission.ejudge_language_id,
    );

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
    } as ISubmission;
};

export const formatContest = (contest: IStatementApi, courseId: number): IContest => ({
    id: contest.id,
    name: contest.name,
    summary: contest.summary,
    problems: contest.problems.map(item => ({
        letter: formatLetter(item.rank - 1),
        name: item.name,
        id: item.id,
        rank: item.rank,
        href: `/contest/${courseId}/problem/${item.id}`,
    })),
});

export function formatLetter(index: number): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersNum = letters.length;

    return index < lettersNum
        ? letters[index]
        : letters[Math.trunc(index / lettersNum - 1)] + letters[index % lettersNum];
}

export const formatProblem = (problem: IProblemApi): IProblem => ({
    id: problem.id,
    name: problem.name,
    content: problem.content,
    timeLimit: problem.timelimit,
    memoryLimit: problem.memorylimit,
    description: problem.description,
    input: problem.sample_tests_json
        ? Object.values(problem.sample_tests_json).map(value => value.input)
        : [],
    correct: problem.sample_tests_json
        ? Object.values(problem.sample_tests_json).map(value => value.correct)
        : [],
    outputOnly: problem.output_only,
});

export const formatProtocol = (protocol: IRunProtocolApi): IRunProtocol => ({
    compilerOutput: protocol.compiler_output,
    host: protocol.host,
    tests: Object.keys(protocol.tests).map(testId => {
        const id = Number(testId);

        return {
            id,
            status: protocol.tests[id].status,
            time: protocol.tests[id].time,
            realTime: protocol.tests[id].real_time,
            memory: protocol.tests[id].max_memory_used,
        };
    }),
});

export const formatSource = (source: IRunSourceApi): IRunSource => ({
    code: source.source,
    language:
        languages.find(language => language.id === source.language_id) || languages[0],
});

export const formatComment = (comment: IRunCommentApi): IRunComment => ({
    author: {
        firstname: comment.author_user.firstname,
        id: comment.author_user.id,
        lastname: comment.author_user.lastname,
        username: comment.author_user.username,
    },
    comment: comment.comment,
    date: comment.date,
    id: comment.id,
    runId: comment.run_id,
    userId: comment.user_id,
});
