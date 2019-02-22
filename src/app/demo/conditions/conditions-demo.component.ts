import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-conditions-demo',
  templateUrl: './conditions-demo.component.html',
  styleUrls: ['./conditions-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionsDemoComponent {
  restrictions = {
    time: '1 сек',
    realTime: '5 сек',
    memory: '512 МБ',
  };

  conditions =  {
    description: [
      `В городе недавно построили парк аттракционов, в котором есть павильон игровых автоматов. Каждый из автоматов рассчитан
  на одного человека. В программе Всероссийской олимпиады планируется посещение этого павильона.`,
      `Перед организаторами встала сложная задача — составить расписание игры участников олимпиады на автоматах таким образом,
  чтобы каждый из N участников олимпиады смог поиграть на каждом из автоматов, и при этом автобус, увозящий участников из
  парка олимпиады, смог бы отправиться к месту проживания как можно раньше.`,
      `Время перемещения участников между автоматами, а также между автобусом и павильоном считается равным нулю. Каждый из
  участников в любой момент времени может как играть
  на автомате, так и ждать своей очереди, например, гуляя по парку. Для каждого из M (M N ) автоматов известно время игры
  на нём ti (1 i M ). Прервать начатую игру на автомате невозможно. Автобус привозит всех участников олимпиады в парк
  одновременно в нулевой момент времени.`,
    ],
    inputData: [
      `В первой строке входного файла содержатся два числа: N и M (1 M N 100 ). Во второй строке заданы M целых чисел ti (1 ti
  100), каждое из которых задаёт время игры на i-м автомате (1 i M ). Числа в строке разделяются одиночными пробелами.`
    ],
    outputData: [
      `В первой строке необходимо вывести одно число — минимально возможное время отправления автобуса из парка аттракционов.
  Далее необходимо вывести N расписаний игр
  на автоматах, по одному для каждого из участников. Каждое расписание описывается в (M + 1 ) строках, первая из которых —
  пустая, а далее следуют M строк, описывающих автоматы в порядке их посещения этим участником. Посещение автомата
  описывается двумя целыми числами: номером автомата j (1 j M ) и временем начала игры участника на этом автомате.`
    ],
    testExamples: [
      {
        title: 'Подзадачи и система оценки',
        text: `Данная задача содержит пять подзадач. Для оценки каждой подзадачи используется своя группа тестов. Баллы за подзадачу
    начисляются только в том случае, если все тесты из этой группы пройдены.`,
      },
      {
        title: 'Подзадача 1 (20 баллов)',
        text: 'M = 1,1 ≤ N ≤ 100, t лежит в пределах от 1 до 100.',
      },
      {
        title: 'Подзадача 2 (20 баллов)',
        text: 'Все t равны 1, N = M.',
      },
      {
        title: 'Подзадача 3 (20 баллов)',
        text: 'Все t равны 1, N = M.',
      },
      {
        title: 'Подзадача 4 (20 баллов)',
        text: 'Числа t лежат в пределах от 1 до 100, N = M.',
      },
      {
        title: 'Подзадача 5 (20 баллов)',
        text: 'Числа t лежат в пределах от 1 до 100, N = M.',
      },
    ],
    dataExamples: {
      input: [
        '3 2',
        '2 1',
      ],
      output: [
        '4',
        '',
        '1 0',
        '',
        '1 2'
      ],
    },
  };
}
