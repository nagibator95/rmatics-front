import { ContestApi, ProblemApi, SubmissionApi } from './contest.types';

export const problems: ProblemApi[] = [
  {
    id: 1,
    name: 'Парк аттракционов',
    content: `<p class="paragraph">В городе недавно построили парк аттракционов, в котором есть павильон игровых
  автоматов. Каждый из автоматов рассчитан
  на одного человека. В программе Всероссийской олимпиады планируется посещение этого павильона.</p>
<p class="paragraph">Перед организаторами встала сложная задача — составить расписание игры
  участников олимпиады на автоматах таким образом,
  чтобы каждый из N участников олимпиады смог поиграть на каждом из автоматов, и при этом автобус, увозящий участников
  из
  парка олимпиады, смог бы отправиться к месту проживания как можно раньше.</p>
<p class="paragraph">Время перемещения участников между автоматами, а также между автобусом и
  павильоном считается равным нулю. Каждый из
  участников в любой момент времени может как играть
  на автомате, так и ждать своей очереди, например, гуляя по парку. Для каждого из M (M N ) автоматов известно время
  игры
  на нём ti (1 i M ). Прервать начатую игру на автомате невозможно. Автобус привозит всех участников олимпиады в парк
  одновременно в нулевой момент времени.</p>
<h3 class="separator">Входные данные</h3>
<p class="paragraph">В первой строке входного файла содержатся два числа: N и M (1 M N 100 ). Во
  второй строке заданы M целых чисел ti (1 ti
  100), каждое из которых задаёт время игры на i-м автомате (1 i M ). Числа в строке разделяются одиночными
  пробелами.</p>
<h3 class="separator">Выходные данные</h3>
<p class="paragraph">В первой строке необходимо вывести одно число — минимально возможное время
  отправления автобуса из парка аттракционов.
  Далее необходимо вывести N расписаний игр
  на автоматах, по одному для каждого из участников. Каждое расписание описывается в (M + 1 ) строках, первая из
  которых —
  пустая, а далее следуют M строк, описывающих автоматы в порядке их посещения этим участником. Посещение автомата
  описывается двумя целыми числами: номером автомата j (1 j M ) и временем начала игры участника на этом автомате.</p>
<h3 class="separator">Примеры тестов</h3>
<p class="paragraph">
  <b class="small-title">Подзадачи и система оценки</b>
  <span>
    Данная задача содержит пять подзадач. Для оценки каждой подзадачи используется своя группа тестов. Баллы за подзадачу
    начисляются только в том случае, если все тесты из этой группы пройдены.
  </span>
</p>
<p class="paragraph paragraph_examples">
  <b class="small-title">Подзадача 1 (20 баллов)</b>
  <span>
    <i>M = 1</i>,<i>1 ≤ N ≤ 100</i>, t лежит в пределах от 1 до 100.
  </span>
</p>
<p class="paragraph paragraph_examples">
  <b class="small-title">Подзадача 2 (20 баллов)</b>
  <span>Все <i>t</i> равны 1, <i>N = M</i>.</span>
</p>
<p class="paragraph paragraph_examples">
  <b class="small-title">Подзадача 3 (20 баллов)</b>
  <span>Все <i>t</i> равны 1, <i>N = M</i>.</span>
</p>
<p class="paragraph paragraph_examples">
  <b class="small-title">Подзадача 4 (20 баллов)</b>
  <span>Числа <i>t</i> лежат в пределах от 1 до 100, <i>N = M</i>.</span>
</p>
<p class="paragraph paragraph_examples">
  <b class="small-title">Подзадача 5 (20 баллов)</b>
  <span>Числа <i>t</i> лежат в пределах от 1 до 100, <i>N = M</i>.</span>
</p>`,
    timelimit: 5,
    memorylimit: 512,
    description: '',
    sample_tests_json: {
      input: `["3 2","2 1"]`,
      correct: `["4","","1 0","","1 2"]`,
    },
    output_only: false,
  },
  {
    id: 2,
    name: 'Вывести четные элементы',
    content: 'content',
    timelimit: 5,
    memorylimit: 512,
    description: '',
    sample_tests_json: {
      input: `["3 2","2 1"]`,
      correct: `["4","","1 0","","1 2"]`,
    },
    output_only: false,
  },
  {
    id: 3,
    name: 'Количество положительных элементов',
    content: 'content',
    timelimit: 5,
    memorylimit: 512,
    description: '',
    sample_tests_json: {
      input: `["3 2","2 1"]`,
      correct: `["4","","1 0","","1 2"]`,
    },
    output_only: false,
  },
  {
    id: 4,
    name: 'Двойной переворот',
    content: 'content',
    timelimit: 5,
    memorylimit: 512,
    description: '',
    sample_tests_json: {
      input: `["3 2","2 1"]`,
      correct: `["4","","1 0","","1 2"]`,
    },
    output_only: false,
  },
  {
    id: 5,
    name: 'Двойной переворот. Часть 2',
    content: 'content',
    timelimit: 5,
    memorylimit: 512,
    description: '',
    sample_tests_json: {
      input: `["3 2","2 1"]`,
      correct: `["4","","1 0","","1 2"]`,
    },
    output_only: false,
  },
  {
    id: 6,
    name: 'Количество положительных элементов',
    content: 'content',
    timelimit: 5,
    memorylimit: 512,
    description: '',
    sample_tests_json: {
      input: `["3 2","2 1"]`,
      correct: `["4","","1 0","","1 2"]`,
    },
    output_only: false,
  },
  {
    id: 7,
    name: 'Двойной переворот',
    content: 'content',
    timelimit: 5,
    memorylimit: 512,
    description: '',
    sample_tests_json: {
      input: `["3 2","2 1"]`,
      correct: `["4","","1 0","","1 2"]`,
    },
    output_only: false,
  },
  {
    id: 8,
    name: 'Вывести четные элементы',
    content: 'content',
    timelimit: 5,
    memorylimit: 512,
    description: '',
    sample_tests_json: {
      input: `["3 2","2 1"]`,
      correct: `["4","","1 0","","1 2"]`,
    },
    output_only: false,
  },
  {
    id: 9,
    name: 'Количество положительных элементов',
    content: 'content',
    timelimit: 5,
    memorylimit: 512,
    description: '',
    sample_tests_json: {
      input: `["3 2","2 1"]`,
      correct: `["4","","1 0","","1 2"]`,
    },
    output_only: false,
  },
];

export const contests: ContestApi[] = [
  {
    id: 1,
    name: 'День 1. Разгоночный контест на графы',
    summary: 'Летняя школа по компьтерным наукам',
    problems: [
      {
        id: 1,
        name: 'Парк аттракционов',
        rank: 1,
      },
      {
        id: 2,
        name: 'Вывести четные элементы',
        rank: 2,
      },
      {
        id: 3,
        name: 'Количество положительных элементов',
        rank: 3,
      },
      {
        id: 4,
        name: 'Двойной переворот',
        rank: 4,
      },
      {
        id: 5,
        name: 'Двойной переворот. Часть 2',
        rank: 5,
      },
      {
        id: 6,
        name: 'Количество положительных элементов',
        rank: 6,
      },
      {
        id: 7,
        name: 'Двойной переворот',
        rank: 7,
      },
      {
        id: 8,
        name: 'Вывести четные элементы',
        rank: 8,
      },
      {
        id: 9,
        name: 'Количество положительных элементов',
        rank: 9,
      },
    ],
  },
];

const fakeSubmissionBase = {
  user: {
    id: 1,
    firstname: 'First',
    lastname: 'Last',
  },
  problem: {
    id: 1,
    name: '',
  },
};

const submissionsBase: SubmissionApi[] = [
  {
    ...fakeSubmissionBase,
    id: 1,
    create_time: new Date().getTime() - 10000000000,
    ejudge_status: 'RJ',
    ejudge_language_id: 27,
    ejudge_test_num: 2,
    ejudge_score: 20,
  },
  {
    ...fakeSubmissionBase,
    id: 2,
    create_time: new Date().getTime(),
    ejudge_status: 'OK',
    ejudge_language_id: 27,
    ejudge_test_num: 5,
    ejudge_score: 50,
  },
  {
    ...fakeSubmissionBase,
    id: 3,
    create_time: new Date().getTime(),
    ejudge_status: 'RJ',
    ejudge_language_id: 27,
    ejudge_test_num: 1,
    ejudge_score: 10,
  },
];

export const submissions: SubmissionApi[] = submissionsBase.concat(submissionsBase, submissionsBase);
