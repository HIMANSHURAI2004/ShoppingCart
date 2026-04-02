import cartReducer from '../cartReducer';
import {
  ADD_ITEM,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART,
} from '../../constants/actionTypes';

describe('cartReducer', () => {
  const initialState = {
    items: [],
  };

  it('should return the initial state', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  describe('ADD_ITEM', () => {
    it('should add a new item to empty cart', () => {
      const product = { id: 1, name: 'Product 1', price: 99.99 };
      const action = { type: ADD_ITEM, payload: product };
      const newState = cartReducer(initialState, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0]).toEqual({ product, quantity: 1 });
    });

    it('should increase quantity if item already exists', () => {
      const product = { id: 1, name: 'Product 1', price: 99.99 };
      const state = {
        items: [{ product, quantity: 1 }],
      };
      const action = { type: ADD_ITEM, payload: product };
      const newState = cartReducer(state, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].quantity).toBe(2);
    });

    it('should add different product to cart', () => {
      const product1 = { id: 1, name: 'Product 1', price: 99.99 };
      const product2 = { id: 2, name: 'Product 2', price: 49.99 };
      const state = {
        items: [{ product: product1, quantity: 1 }],
      };
      const action = { type: ADD_ITEM, payload: product2 };
      const newState = cartReducer(state, action);

      expect(newState.items).toHaveLength(2);
      expect(newState.items[1]).toEqual({ product: product2, quantity: 1 });
    });

    it('should increase quantity of existing product when multiple products in cart', () => {
      const product1 = { id: 1, name: 'Product 1', price: 99.99 };
      const product2 = { id: 2, name: 'Product 2', price: 49.99 };
      const product3 = { id: 3, name: 'Product 3', price: 29.99 };
      const state = {
        items: [
          { product: product1, quantity: 1 },
          { product: product2, quantity: 2 },
          { product: product3, quantity: 1 },
        ],
      };
      const action = { type: ADD_ITEM, payload: product2 };
      const newState = cartReducer(state, action);

      expect(newState.items).toHaveLength(3);
      expect(newState.items[0].quantity).toBe(1); // product1 unchanged
      expect(newState.items[1].quantity).toBe(3); // product2 increased
      expect(newState.items[2].quantity).toBe(1); // product3 unchanged
    });
  });

  describe('INCREASE_QUANTITY', () => {
    it('should increase quantity of existing item', () => {
      const product = { id: 1, name: 'Product 1', price: 99.99 };
      const state = {
        items: [{ product, quantity: 1 }],
      };
      const action = { type: INCREASE_QUANTITY, payload: 1 };
      const newState = cartReducer(state, action);

      expect(newState.items[0].quantity).toBe(2);
    });

    it('should not affect other items', () => {
      const product1 = { id: 1, name: 'Product 1', price: 99.99 };
      const product2 = { id: 2, name: 'Product 2', price: 49.99 };
      const state = {
        items: [
          { product: product1, quantity: 1 },
          { product: product2, quantity: 3 },
        ],
      };
      const action = { type: INCREASE_QUANTITY, payload: 1 };
      const newState = cartReducer(state, action);

      expect(newState.items[0].quantity).toBe(2);
      expect(newState.items[1].quantity).toBe(3);
    });
  });

  describe('DECREASE_QUANTITY', () => {
    it('should decrease quantity of existing item', () => {
      const product = { id: 1, name: 'Product 1', price: 99.99 };
      const state = {
        items: [{ product, quantity: 2 }],
      };
      const action = { type: DECREASE_QUANTITY, payload: 1 };
      const newState = cartReducer(state, action);

      expect(newState.items[0].quantity).toBe(1);
    });

    it('should remove item when quantity becomes 0', () => {
      const product = { id: 1, name: 'Product 1', price: 99.99 };
      const state = {
        items: [{ product, quantity: 1 }],
      };
      const action = { type: DECREASE_QUANTITY, payload: 1 };
      const newState = cartReducer(state, action);

      expect(newState.items).toHaveLength(0);
    });

    it('should not affect other items', () => {
      const product1 = { id: 1, name: 'Product 1', price: 99.99 };
      const product2 = { id: 2, name: 'Product 2', price: 49.99 };
      const state = {
        items: [
          { product: product1, quantity: 2 },
          { product: product2, quantity: 3 },
        ],
      };
      const action = { type: DECREASE_QUANTITY, payload: 1 };
      const newState = cartReducer(state, action);

      expect(newState.items).toHaveLength(2);
      expect(newState.items[0].quantity).toBe(1);
      expect(newState.items[1].quantity).toBe(3);
    });
  });

  describe('CLEAR_CART', () => {
    it('should clear all items from cart', () => {
      const product1 = { id: 1, name: 'Product 1', price: 99.99 };
      const product2 = { id: 2, name: 'Product 2', price: 49.99 };
      const state = {
        items: [
          { product: product1, quantity: 2 },
          { product: product2, quantity: 1 },
        ],
      };
      const action = { type: CLEAR_CART };
      const newState = cartReducer(state, action);

      expect(newState.items).toEqual([]);
    });

    it('should work on empty cart', () => {
      const action = { type: CLEAR_CART };
      const newState = cartReducer(initialState, action);

      expect(newState.items).toEqual([]);
    });
  });
});

