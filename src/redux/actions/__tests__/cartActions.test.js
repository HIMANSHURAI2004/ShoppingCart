import { addItem, increaseQuantity, decreaseQuantity, clearCart } from '../cartActions';
import { ADD_ITEM, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from '../../constants/actionTypes';

describe('cartActions', () => {
  describe('addItem', () => {
    it('should create an action to add an item', () => {
      const product = {
        id: 1,
        name: 'Test Product',
        price: 99.99,
        image: 'test.jpg',
        category: 'Test',
      };
      const expectedAction = {
        type: ADD_ITEM,
        payload: product,
      };
      expect(addItem(product)).toEqual(expectedAction);
    });
  });

  describe('increaseQuantity', () => {
    it('should create an action to increase quantity', () => {
      const productId = 1;
      const expectedAction = {
        type: INCREASE_QUANTITY,
        payload: productId,
      };
      expect(increaseQuantity(productId)).toEqual(expectedAction);
    });
  });

  describe('decreaseQuantity', () => {
    it('should create an action to decrease quantity', () => {
      const productId = 1;
      const expectedAction = {
        type: DECREASE_QUANTITY,
        payload: productId,
      };
      expect(decreaseQuantity(productId)).toEqual(expectedAction);
    });
  });

  describe('clearCart', () => {
    it('should create an action to clear cart', () => {
      const expectedAction = {
        type: CLEAR_CART,
      };
      expect(clearCart()).toEqual(expectedAction);
    });
  });
});

