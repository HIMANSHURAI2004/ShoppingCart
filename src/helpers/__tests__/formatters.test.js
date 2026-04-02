import { formatPrice } from '../formatters';

describe('formatters', () => {
  describe('formatPrice', () => {
    it('should format integer price with two decimals', () => {
      expect(formatPrice(10)).toBe('10.00');
    });

    it('should format price with one decimal to two decimals', () => {
      expect(formatPrice(10.5)).toBe('10.50');
    });

    it('should format price with two decimals correctly', () => {
      expect(formatPrice(10.99)).toBe('10.99');
    });

    it('should round price with more than two decimals', () => {
      expect(formatPrice(10.999)).toBe('11.00');
    });

    it('should format zero correctly', () => {
      expect(formatPrice(0)).toBe('0.00');
    });

    it('should handle negative prices', () => {
      expect(formatPrice(-10.5)).toBe('-10.50');
    });

    it('should handle string numbers', () => {
      expect(formatPrice('10.5')).toBe('10.50');
    });

    it('should handle large numbers', () => {
      expect(formatPrice(999999.99)).toBe('999999.99');
    });

    it('should round down when third decimal is less than 5', () => {
      expect(formatPrice(10.994)).toBe('10.99');
    });

    it('should round up when third decimal is 5 or more', () => {
      expect(formatPrice(10.995)).toBe('10.99');
    });
  });
});

