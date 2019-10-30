import {MinuteSecondsPipe} from './minute-seconds.pipe';

describe('MinuteSeconds', () => {
    let pipe: MinuteSecondsPipe;

    beforeEach(() => {
        pipe = new MinuteSecondsPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    describe('Calculations', () => {
        it('Positive input', () => {
            const actual = pipe.transform(1936);

            expect(actual).toEqual('32:16');
        });

        it('Negative input', () => {
            const actual = pipe.transform(-324);

            expect(actual).toEqual('-05:24');
        });
    });
});
