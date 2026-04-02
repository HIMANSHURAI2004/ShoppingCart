import { handleCheckout } from '../checkout';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast');

describe('checkout', () => {
  let mockDispatch;
  let mockClearCartAction;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockClearCartAction = jest.fn(() => ({ type: 'CLEAR_CART' }));
    toast.success = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleCheckout', () => {
    it('should show success toast', () => {
      handleCheckout(mockDispatch, mockClearCartAction);
      expect(toast.success).toHaveBeenCalledWith('Checkout Successful');
    });

    it('should dispatch clear cart action', () => {
      handleCheckout(mockDispatch, mockClearCartAction);
      expect(mockClearCartAction).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_CART' });
    });

    it('should show toast before clearing cart', () => {
      const callOrder = [];
      toast.success.mockImplementation(() => callOrder.push('toast'));
      mockDispatch.mockImplementation(() => callOrder.push('dispatch'));

      handleCheckout(mockDispatch, mockClearCartAction);

      expect(callOrder).toEqual(['toast', 'dispatch']);
    });
  });
});

