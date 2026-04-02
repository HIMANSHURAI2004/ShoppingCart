import productsReducer from '../productsReducer';
import { SET_LOADING, SET_PRODUCTS, SET_ERROR } from '../../constants/actionTypes';

describe('productsReducer', () => {
  const initialState = {
    products: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(productsReducer(undefined, {})).toEqual(initialState);
  });

  describe('SET_LOADING', () => {
    it('should set loading to true', () => {
      const action = { type: SET_LOADING };
      const newState = productsReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.products).toEqual([]);
      expect(newState.error).toBeNull();
    });

    it('should set loading to true when products exist', () => {
      const state = {
        products: [{ id: 1, name: 'Product 1' }],
        loading: false,
        error: null,
      };
      const action = { type: SET_LOADING };
      const newState = productsReducer(state, action);

      expect(newState.loading).toBe(true);
    });
  });

  describe('SET_PRODUCTS', () => {
    it('should set products and set loading to false', () => {
      const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
      ];
      const state = { ...initialState, loading: true };
      const action = { type: SET_PRODUCTS, payload: products };
      const newState = productsReducer(state, action);

      expect(newState.products).toEqual(products);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
    });

    it('should handle empty products array', () => {
      const state = { ...initialState, loading: true };
      const action = { type: SET_PRODUCTS, payload: [] };
      const newState = productsReducer(state, action);

      expect(newState.products).toEqual([]);
      expect(newState.loading).toBe(false);
    });

    it('should replace existing products', () => {
      const oldProducts = [{ id: 1, name: 'Old Product' }];
      const newProducts = [
        { id: 2, name: 'New Product 1' },
        { id: 3, name: 'New Product 2' },
      ];
      const state = { products: oldProducts, loading: true, error: null };
      const action = { type: SET_PRODUCTS, payload: newProducts };
      const newState = productsReducer(state, action);

      expect(newState.products).toEqual(newProducts);
    });
  });

  describe('SET_ERROR', () => {
    it('should set error and set loading to false', () => {
      const error = 'Failed to fetch products';
      const state = { ...initialState, loading: true };
      const action = { type: SET_ERROR, payload: error };
      const newState = productsReducer(state, action);

      expect(newState.error).toBe(error);
      expect(newState.loading).toBe(false);
      expect(newState.products).toEqual([]);
    });

    it('should handle null error', () => {
      const state = { ...initialState, loading: true };
      const action = { type: SET_ERROR, payload: null };
      const newState = productsReducer(state, action);

      expect(newState.error).toBeNull();
      expect(newState.loading).toBe(false);
    });

    it('should clear previous error when setting new error', () => {
      const state = {
        products: [],
        loading: true,
        error: 'Old error',
      };
      const newError = 'New error';
      const action = { type: SET_ERROR, payload: newError };
      const newState = productsReducer(state, action);

      expect(newState.error).toBe(newError);
    });
  });
});

