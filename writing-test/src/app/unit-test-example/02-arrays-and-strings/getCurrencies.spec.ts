import { getCurrencies } from './getCurrencies';

describe('greet', () => {
    it('should return supported currencies', () => {
        const result = getCurrencies();
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');
    })

})