import { handleIncreaseQuantity, handleDecreaseQuantity } from '../cartItemActions';

describe('cartItemActions', () => {
  let mockDispatch;
  let mockIncreaseAction;
  let mockDecreaseAction;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockIncreaseAction = jest.fn((id) => ({ type: 'INCREASE', payload: id }));
    mockDecreaseAction = jest.fn((id) => ({ type: 'DECREASE', payload: id }));
  });

  describe('handleIncreaseQuantity', () => {
    it('should call dispatch with increase action', () => {
      const productId = 1;
      handleIncreaseQuantity(mockDispatch, mockIncreaseAction, productId);

      expect(mockIncreaseAction).toHaveBeenCalledWith(productId);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE', payload: productId });
    });

    it('should work with different product IDs', () => {
      handleIncreaseQuantity(mockDispatch, mockIncreaseAction, 5);
      expect(mockIncreaseAction).toHaveBeenCalledWith(5);

      handleIncreaseQuantity(mockDispatch, mockIncreaseAction, 10);
      expect(mockIncreaseAction).toHaveBeenCalledWith(10);
    });
  });

  describe('handleDecreaseQuantity', () => {
    it('should call dispatch with decrease action', () => {
      const productId = 1;
      handleDecreaseQuantity(mockDispatch, mockDecreaseAction, productId);

      expect(mockDecreaseAction).toHaveBeenCalledWith(productId);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'DECREASE', payload: productId });
    });

    it('should work with different product IDs', () => {
      handleDecreaseQuantity(mockDispatch, mockDecreaseAction, 3);
      expect(mockDecreaseAction).toHaveBeenCalledWith(3);

      handleDecreaseQuantity(mockDispatch, mockDecreaseAction, 7);
      expect(mockDecreaseAction).toHaveBeenCalledWith(7);
    });
  });
});

