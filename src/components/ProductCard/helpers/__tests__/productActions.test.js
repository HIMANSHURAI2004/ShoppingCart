import { handleAddProductToCart } from '../productActions';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast');

describe('productActions', () => {
  let mockDispatch;
  let mockAddItemAction;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockAddItemAction = jest.fn((product) => ({ type: 'ADD_ITEM', payload: product }));
    toast.success = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleAddProductToCart', () => {
    it('should show success toast', () => {
      const product = { id: 1, name: 'Product 1', price: 10 };
      handleAddProductToCart(mockDispatch, mockAddItemAction, product);
      expect(toast.success).toHaveBeenCalledWith('Added to Cart');
    });

    it('should dispatch add item action with product', () => {
      const product = { id: 1, name: 'Product 1', price: 10 };
      handleAddProductToCart(mockDispatch, mockAddItemAction, product);
      
      expect(mockAddItemAction).toHaveBeenCalledWith(product);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_ITEM',
        payload: product,
      });
    });

    it('should show toast before adding to cart', () => {
      const callOrder = [];
      toast.success.mockImplementation(() => callOrder.push('toast'));
      mockDispatch.mockImplementation(() => callOrder.push('dispatch'));

      const product = { id: 1, name: 'Product 1', price: 10 };
      handleAddProductToCart(mockDispatch, mockAddItemAction, product);

      expect(callOrder).toEqual(['toast', 'dispatch']);
    });

    it('should work with different products', () => {
      const product1 = { id: 1, name: 'Product 1', price: 10 };
      const product2 = { id: 2, name: 'Product 2', price: 20 };

      handleAddProductToCart(mockDispatch, mockAddItemAction, product1);
      expect(mockAddItemAction).toHaveBeenCalledWith(product1);

      handleAddProductToCart(mockDispatch, mockAddItemAction, product2);
      expect(mockAddItemAction).toHaveBeenCalledWith(product2);
    });
  });
});

