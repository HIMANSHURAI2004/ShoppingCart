import { SHIPPING_COST, TAX_AMOUNT, ADDITIONAL_CHARGES, MOCK_API_DELAY_MS } from '../appConstants';

describe('appConstants', () => {
  describe('SHIPPING_COST', () => {
    it('should be defined', () => {
      expect(SHIPPING_COST).toBeDefined();
    });

    it('should be 10.00', () => {
      expect(SHIPPING_COST).toBe(10.00);
    });

    it('should be a number', () => {
      expect(typeof SHIPPING_COST).toBe('number');
    });
  });

  describe('TAX_AMOUNT', () => {
    it('should be defined', () => {
      expect(TAX_AMOUNT).toBeDefined();
    });

    it('should be 5.00', () => {
      expect(TAX_AMOUNT).toBe(5.00);
    });

    it('should be a number', () => {
      expect(typeof TAX_AMOUNT).toBe('number');
    });
  });

  describe('ADDITIONAL_CHARGES', () => {
    it('should be defined', () => {
      expect(ADDITIONAL_CHARGES).toBeDefined();
    });

    it('should equal SHIPPING_COST + TAX_AMOUNT', () => {
      expect(ADDITIONAL_CHARGES).toBe(SHIPPING_COST + TAX_AMOUNT);
    });

    it('should be 15.00', () => {
      expect(ADDITIONAL_CHARGES).toBe(15.00);
    });

    it('should be a number', () => {
      expect(typeof ADDITIONAL_CHARGES).toBe('number');
    });
  });

  describe('MOCK_API_DELAY_MS', () => {
    it('should be defined', () => {
      expect(MOCK_API_DELAY_MS).toBeDefined();
    });

    it('should be 1500', () => {
      expect(MOCK_API_DELAY_MS).toBe(1500);
    });

    it('should be a number', () => {
      expect(typeof MOCK_API_DELAY_MS).toBe('number');
    });
  });
});

