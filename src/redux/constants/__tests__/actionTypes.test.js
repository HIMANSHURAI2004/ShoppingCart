import {
  ADD_ITEM,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART,
  SET_LOADING,
  SET_PRODUCTS,
  SET_ERROR,
} from '../actionTypes';

describe('actionTypes', () => {
  describe('Cart action types', () => {
    it('should have ADD_ITEM constant', () => {
      expect(ADD_ITEM).toBe('ADD_ITEM');
    });

    it('should have INCREASE_QUANTITY constant', () => {
      expect(INCREASE_QUANTITY).toBe('INCREASE_QUANTITY');
    });

    it('should have DECREASE_QUANTITY constant', () => {
      expect(DECREASE_QUANTITY).toBe('DECREASE_QUANTITY');
    });

    it('should have CLEAR_CART constant', () => {
      expect(CLEAR_CART).toBe('CLEAR_CART');
    });

    it('should have all cart action types as strings', () => {
      expect(typeof ADD_ITEM).toBe('string');
      expect(typeof INCREASE_QUANTITY).toBe('string');
      expect(typeof DECREASE_QUANTITY).toBe('string');
      expect(typeof CLEAR_CART).toBe('string');
    });
  });

  describe('Products action types', () => {
    it('should have SET_LOADING constant', () => {
      expect(SET_LOADING).toBe('SET_LOADING');
    });

    it('should have SET_PRODUCTS constant', () => {
      expect(SET_PRODUCTS).toBe('SET_PRODUCTS');
    });

    it('should have SET_ERROR constant', () => {
      expect(SET_ERROR).toBe('SET_ERROR');
    });

    it('should have all product action types as strings', () => {
      expect(typeof SET_LOADING).toBe('string');
      expect(typeof SET_PRODUCTS).toBe('string');
      expect(typeof SET_ERROR).toBe('string');
    });
  });

  describe('Action type uniqueness', () => {
    it('should have unique action type values', () => {
      const actionTypes = [
        ADD_ITEM,
        INCREASE_QUANTITY,
        DECREASE_QUANTITY,
        CLEAR_CART,
        SET_LOADING,
        SET_PRODUCTS,
        SET_ERROR,
      ];
      const uniqueTypes = new Set(actionTypes);
      expect(uniqueTypes.size).toBe(actionTypes.length);
    });
  });
});

