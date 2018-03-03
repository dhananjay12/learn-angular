import { greet } from './greet';

describe('greet', () => {
    it('should return name in the Welcome message', () => {
        const result = greet('Dj');
        expect(result).toContain('Dj');
    })

})