import { setLoading, setProducts, setError } from '../productActions';
import { SET_LOADING, SET_PRODUCTS, SET_ERROR } from '../../constants/actionTypes';

describe('productActions', () => {
  describe('setLoading', () => {
    it('should create an action to set loading state', () => {
      const expectedAction = {
        type: SET_LOADING,
      };
      expect(setLoading()).toEqual(expectedAction);
    });
  });

  describe('setProducts', () => {
    it('should create an action to set products', () => {
      const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
      ];
      const expectedAction = {
        type: SET_PRODUCTS,
        payload: products,
      };
      expect(setProducts(products)).toEqual(expectedAction);
    });

    it('should handle empty products array', () => {
      const products = [];
      const expectedAction = {
        type: SET_PRODUCTS,
        payload: products,
      };
      expect(setProducts(products)).toEqual(expectedAction);
    });
  });

  describe('setError', () => {
    it('should create an action to set error', () => {
      const error = 'Failed to fetch products';
      const expectedAction = {
        type: SET_ERROR,
        payload: error,
      };
      expect(setError(error)).toEqual(expectedAction);
    });

    it('should handle null error', () => {
      const error = null;
      const expectedAction = {
        type: SET_ERROR,
        payload: error,
      };
      expect(setError(error)).toEqual(expectedAction);
    });
  });
});

