import { loadState, saveState, clearState } from '../localStorage';

describe('localStorage helpers', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Spy on console.error
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  describe('loadState', () => {
    it('should return undefined when localStorage is empty', () => {
      expect(loadState()).toBeUndefined();
    });

    it('should return parsed state when localStorage has data', () => {
      const state = {
        items: [
          { product: { id: 1, name: 'Product 1' }, quantity: 2 },
        ],
      };
      localStorage.setItem('cartState', JSON.stringify(state));
      expect(loadState()).toEqual(state);
    });

    it('should return undefined and log error for invalid JSON', () => {
      localStorage.setItem('cartState', 'invalid json');
      expect(loadState()).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error loading state from localStorage:',
        expect.any(Error)
      );
    });

    it('should handle complex nested state', () => {
      const state = {
        items: [
          {
            product: { id: 1, name: 'Product 1', price: 99.99, category: 'Test' },
            quantity: 3,
          },
          {
            product: { id: 2, name: 'Product 2', price: 49.99, category: 'Test2' },
            quantity: 1,
          },
        ],
      };
      localStorage.setItem('cartState', JSON.stringify(state));
      expect(loadState()).toEqual(state);
    });
  });

  describe('saveState', () => {
    it('should save state to localStorage', () => {
      const state = {
        items: [
          { product: { id: 1, name: 'Product 1' }, quantity: 2 },
        ],
      };
      saveState(state);
      expect(localStorage.getItem('cartState')).toBe(JSON.stringify(state));
    });

    it('should save empty state', () => {
      const state = { items: [] };
      saveState(state);
      expect(localStorage.getItem('cartState')).toBe(JSON.stringify(state));
    });

    it('should overwrite existing state', () => {
      const oldState = { items: [{ product: { id: 1 }, quantity: 1 }] };
      const newState = { items: [{ product: { id: 2 }, quantity: 5 }] };
      
      saveState(oldState);
      saveState(newState);
      
      expect(localStorage.getItem('cartState')).toBe(JSON.stringify(newState));
    });

    it('should handle error during save', () => {
      // Mock localStorage.setItem to throw error
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      const state = { items: [] };
      saveState(state);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error saving state to localStorage:',
        expect.any(Error)
      );

      setItemSpy.mockRestore();
    });
  });

  describe('clearState', () => {
    it('should remove cartState from localStorage', () => {
      localStorage.setItem('cartState', JSON.stringify({ items: [] }));
      clearState();
      expect(localStorage.getItem('cartState')).toBeNull();
    });

    it('should not throw error when localStorage is empty', () => {
      expect(() => clearState()).not.toThrow();
    });

    it('should handle error during clear', () => {
      // Mock localStorage.removeItem to throw error
      const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Cannot access localStorage');
      });

      clearState();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error clearing state from localStorage:',
        expect.any(Error)
      );

      removeItemSpy.mockRestore();
    });

    it('should only remove cartState and not affect other localStorage items', () => {
      localStorage.setItem('cartState', JSON.stringify({ items: [] }));
      localStorage.setItem('otherKey', 'otherValue');
      
      clearState();
      
      expect(localStorage.getItem('cartState')).toBeNull();
      expect(localStorage.getItem('otherKey')).toBe('otherValue');
    });
  });
});

