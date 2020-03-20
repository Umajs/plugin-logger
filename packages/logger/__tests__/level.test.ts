import getLevel from './../src/level';

describe('test src/level.ts', () => {
    it('should get number 0 to match debug', () => {
        expect(getLevel('debug')).toBe(0)
    });
    it('should get number 0 to match DEBUG', () => {
        expect(getLevel('DEBUG')).toBe(0)
    });
    it('should get number 3 to match error', () => {
        expect(getLevel('error')).toBe(3)
    });
});