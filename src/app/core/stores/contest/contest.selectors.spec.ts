import {getProtocol} from './contest.selectors';

describe('ContestSelectors', () => {
  describe('getProtocol', () => {
    it('Возвращает протокол контеста, обрезая пробелы в выводе компилятора', () => {
      // arrange
      const state = {
        submissionState: {protocol: {data: {compilerOutput: ' Some text   '}}},
      };

      // act & assert
      expect(getProtocol().projector(state)).toEqual({compilerOutput: 'Some text'});
    });

    it('Возвращает null, если данных нет', () => {
      // arrange
      const state = {
        submissionState: {protocol: {}},
      };

      // act & assert
      expect(getProtocol().projector(state)).toBe(null);
    });
  });
});
