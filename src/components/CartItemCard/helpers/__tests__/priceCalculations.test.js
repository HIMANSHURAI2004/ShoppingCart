import { calculateItemSubtotal } from '../priceCalculations';

describe('priceCalculations', () => {
  describe('calculateItemSubtotal', () => {
    it('should calculate subtotal for single quantity', () => {
      expect(calculateItemSubtotal(10.5, 1)).toBe('10.50');
    });

    it('should calculate subtotal for multiple quantities', () => {
      expect(calculateItemSubtotal(10.5, 3)).toBe('31.50');
    });

    it('should handle zero quantity', () => {
      expect(calculateItemSubtotal(10.5, 0)).toBe('0.00');
    });

    it('should format result with two decimals', () => {
      expect(calculateItemSubtotal(10, 1)).toBe('10.00');
    });

    it('should handle prices with multiple decimals', () => {
      expect(calculateItemSubtotal(9.99, 2)).toBe('19.98');
    });

    it('should handle large quantities', () => {
      expect(calculateItemSubtotal(5.5, 100)).toBe('550.00');
    });

    it('should round correctly', () => {
      expect(calculateItemSubtotal(10.666, 3)).toBe('32.00');
    });

    it('should handle fractional results', () => {
      expect(calculateItemSubtotal(10.33, 3)).toBe('30.99');
    });
  });
});

