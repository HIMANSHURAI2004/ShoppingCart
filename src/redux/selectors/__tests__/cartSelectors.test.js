import {
  selectCartItemCount,
  selectCartTotal,
  selectCartItems,
  selectProductQuantity,
} from '../cartSelectors';

describe('cartSelectors', () => {
  describe('selectCartItemCount', () => {
    it('should return 0 for empty cart', () => {
      const state = { cart: { items: [] } };
      expect(selectCartItemCount(state)).toBe(0);
    });

    it('should return correct count of items', () => {
      const state = {
        cart: {
          items: [
            { product: { id: 1 }, quantity: 2 },
            { product: { id: 2 }, quantity: 1 },
            { product: { id: 3 }, quantity: 3 },
          ],
        },
      };
      expect(selectCartItemCount(state)).toBe(3);
    });

    it('should handle missing cart', () => {
      const state = {};
      expect(selectCartItemCount(state)).toBe(0);
    });

    it('should handle missing items array', () => {
      const state = { cart: {} };
      expect(selectCartItemCount(state)).toBe(0);
    });

    it('should handle null items', () => {
      const state = { cart: { items: null } };
      expect(selectCartItemCount(state)).toBe(0);
    });
  });

  describe('selectCartTotal', () => {
    it('should return 0 for empty cart', () => {
      const state = { cart: { items: [] } };
      expect(selectCartTotal(state)).toBe(0);
    });

    it('should calculate correct total for single item', () => {
      const state = {
        cart: {
          items: [{ product: { id: 1, price: 10.5 }, quantity: 2 }],
        },
      };
      expect(selectCartTotal(state)).toBe(21);
    });

    it('should calculate correct total for multiple items', () => {
      const state = {
        cart: {
          items: [
            { product: { id: 1, price: 10.5 }, quantity: 2 },
            { product: { id: 2, price: 20.25 }, quantity: 1 },
            { product: { id: 3, price: 5.0 }, quantity: 3 },
          ],
        },
      };
      // (10.5 * 2) + (20.25 * 1) + (5.0 * 3) = 21 + 20.25 + 15 = 56.25
      expect(selectCartTotal(state)).toBe(56.25);
    });

    it('should handle missing cart', () => {
      const state = {};
      expect(selectCartTotal(state)).toBe(0);
    });

    it('should handle missing items array', () => {
      const state = { cart: {} };
      expect(selectCartTotal(state)).toBe(0);
    });

    it('should handle null items', () => {
      const state = { cart: { items: null } };
      expect(selectCartTotal(state)).toBe(0);
    });
  });

  describe('selectCartItems', () => {
    it('should return empty array for empty cart', () => {
      const state = { cart: { items: [] } };
      expect(selectCartItems(state)).toEqual([]);
    });

    it('should return all cart items', () => {
      const items = [
        { product: { id: 1, name: 'Product 1' }, quantity: 2 },
        { product: { id: 2, name: 'Product 2' }, quantity: 1 },
      ];
      const state = { cart: { items } };
      expect(selectCartItems(state)).toEqual(items);
    });

    it('should handle missing cart', () => {
      const state = {};
      expect(selectCartItems(state)).toEqual([]);
    });

    it('should handle missing items array', () => {
      const state = { cart: {} };
      expect(selectCartItems(state)).toEqual([]);
    });

    it('should handle null items', () => {
      const state = { cart: { items: null } };
      expect(selectCartItems(state)).toEqual([]);
    });
  });

  describe('selectProductQuantity', () => {
    it('should return 0 when product not in cart', () => {
      const state = {
        cart: {
          items: [{ product: { id: 1 }, quantity: 2 }],
        },
      };
      expect(selectProductQuantity(state, 2)).toBe(0);
    });

    it('should return correct quantity when product in cart', () => {
      const state = {
        cart: {
          items: [
            { product: { id: 1 }, quantity: 2 },
            { product: { id: 2 }, quantity: 5 },
          ],
        },
      };
      expect(selectProductQuantity(state, 2)).toBe(5);
    });

    it('should return 0 for empty cart', () => {
      const state = { cart: { items: [] } };
      expect(selectProductQuantity(state, 1)).toBe(0);
    });

    it('should handle missing cart', () => {
      const state = {};
      expect(selectProductQuantity(state, 1)).toBe(0);
    });

    it('should handle missing items array', () => {
      const state = { cart: {} };
      expect(selectProductQuantity(state, 1)).toBe(0);
    });
  });
});

