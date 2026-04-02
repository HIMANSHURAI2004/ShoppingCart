import store from '../store';
import { addItem, increaseQuantity, decreaseQuantity, clearCart } from '../actions/cartActions';
import { setProducts, setLoading, setError } from '../actions/productActions';
import * as localStorage from '../localStorage';

jest.mock('../localStorage');

describe('Redux Store', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorage.loadState.mockReturnValue(null);
    localStorage.saveState.mockImplementation(() => {});

    // Clear the cart before each test to prevent state leakage
    store.dispatch(clearCart());
  });

  describe('Store initialization', () => {
    it('should be defined', () => {
      expect(store).toBeDefined();
    });

    it('should have initial state', () => {
      const state = store.getState();
      expect(state).toHaveProperty('cart');
      expect(state).toHaveProperty('products');
    });

    it('should have cart in initial state', () => {
      const state = store.getState();
      expect(state.cart).toHaveProperty('items');
      expect(Array.isArray(state.cart.items)).toBe(true);
    });

    it('should have products in initial state', () => {
      const state = store.getState();
      expect(state.products).toHaveProperty('products');
      expect(state.products).toHaveProperty('loading');
      expect(state.products).toHaveProperty('error');
    });
  });

  describe('Cart actions', () => {
    it('should handle addItem action', () => {
      const product = { id: 1, name: 'Test Product', price: 10 };
      store.dispatch(addItem(product));
      
      const state = store.getState();
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].product).toEqual(product);
      expect(state.cart.items[0].quantity).toBe(1);
    });

    it('should handle increaseQuantity action', () => {
      const product = { id: 1, name: 'Test Product', price: 10 };
      store.dispatch(addItem(product));
      store.dispatch(increaseQuantity(1));
      
      const state = store.getState();
      expect(state.cart.items[0].quantity).toBe(2);
    });

    it('should handle decreaseQuantity action', () => {
      const product = { id: 1, name: 'Test Product', price: 10 };
      store.dispatch(addItem(product));
      store.dispatch(increaseQuantity(1));
      store.dispatch(decreaseQuantity(1));
      
      const state = store.getState();
      expect(state.cart.items[0].quantity).toBe(1);
    });

    it('should handle clearCart action', () => {
      const product1 = { id: 1, name: 'Product 1', price: 10 };
      const product2 = { id: 2, name: 'Product 2', price: 20 };
      store.dispatch(addItem(product1));
      store.dispatch(addItem(product2));
      store.dispatch(clearCart());
      
      const state = store.getState();
      expect(state.cart.items).toHaveLength(0);
    });
  });

  describe('Products actions', () => {
    it('should handle setLoading action', () => {
      store.dispatch(setLoading());
      
      const state = store.getState();
      expect(state.products.loading).toBe(true);
    });

    it('should handle setProducts action', () => {
      const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
      ];
      store.dispatch(setProducts(products));
      
      const state = store.getState();
      expect(state.products.products).toEqual(products);
      expect(state.products.loading).toBe(false);
    });

    it('should handle setError action', () => {
      const errorMessage = 'Failed to fetch products';
      store.dispatch(setError(errorMessage));
      
      const state = store.getState();
      expect(state.products.error).toBe(errorMessage);
      expect(state.products.loading).toBe(false);
    });
  });

  describe('LocalStorage integration', () => {
    it('should call saveState when cart state changes', () => {
      const product = { id: 1, name: 'Test Product', price: 10 };
      store.dispatch(addItem(product));
      
      expect(localStorage.saveState).toHaveBeenCalled();
    });

    it('should save cart state to localStorage', () => {
      const product = { id: 1, name: 'Test Product', price: 10 };
      store.dispatch(addItem(product));
      
      const state = store.getState();
      expect(localStorage.saveState).toHaveBeenCalledWith(state.cart);
    });
  });

  describe('Combined reducers', () => {
    it('should update only cart state when cart action dispatched', () => {
      const initialProductsState = store.getState().products;
      const product = { id: 1, name: 'Test Product', price: 10 };

      store.dispatch(addItem(product));

      const state = store.getState();
      expect(state.products).toEqual(initialProductsState);
      expect(state.cart.items).toHaveLength(1);
    });

    it('should update only products state when product action dispatched', () => {
      const product = { id: 1, name: 'Test Product', price: 10 };
      store.dispatch(addItem(product));
      const initialCartState = store.getState().cart;

      store.dispatch(setLoading());

      const state = store.getState();
      expect(state.cart).toEqual(initialCartState);
      expect(state.products.loading).toBe(true);
    });
  });

  describe('State persistence integration', () => {
    it('should have cart and products in state', () => {
      const state = store.getState();
      expect(state).toHaveProperty('cart');
      expect(state).toHaveProperty('products');
    });

    it('should persist cart state after actions', () => {
      const product = { id: 99, name: 'Persistence Test', price: 100 };

      store.dispatch(addItem(product));

      // saveState should have been called with the cart state
      const calls = localStorage.saveState.mock.calls;
      expect(calls.length).toBeGreaterThan(0);

      // The last call should have the cart state
      const lastCall = calls[calls.length - 1];
      expect(lastCall[0]).toHaveProperty('items');
    });
  });

  describe('Redux DevTools', () => {
    it('should work with or without Redux DevTools extension', () => {
      // The store is created with optional Redux DevTools support
      // This test verifies the store works regardless of DevTools availability
      expect(store).toBeDefined();
      expect(typeof store.dispatch).toBe('function');
      expect(typeof store.getState).toBe('function');
      expect(typeof store.subscribe).toBe('function');
    });
  });
});

