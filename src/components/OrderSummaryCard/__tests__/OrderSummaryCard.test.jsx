import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OrderSummaryCard from '../OrderSummaryCard';
import * as checkout from '../helpers/checkout';

jest.mock('../helpers/checkout');

const mockStore = configureStore([]);

describe('OrderSummaryCard', () => {
  let store;

  beforeEach(() => {
    checkout.handleCheckout = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderOrderSummary = () => {
    return render(
      <Provider store={store}>
        <OrderSummaryCard />
      </Provider>
    );
  };

  describe('With empty cart', () => {
    beforeEach(() => {
      store = mockStore({
        cart: {
          items: [],
        },
      });
    });

    it('should render ORDER SUMMARY title', () => {
      renderOrderSummary();
      expect(screen.getByText('ORDER SUMMARY')).toBeInTheDocument();
    });

    it('should show subtotal of 0.00', () => {
      renderOrderSummary();
      const subtotalValues = screen.getAllByText('$0.00');
      expect(subtotalValues.length).toBeGreaterThan(0);
    });

    it('should show shipping cost', () => {
      renderOrderSummary();
      expect(screen.getByText('Shipping')).toBeInTheDocument();
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    it('should show tax amount', () => {
      renderOrderSummary();
      expect(screen.getByText('Tax')).toBeInTheDocument();
      expect(screen.getByText('$5.00')).toBeInTheDocument();
    });

    it('should show total as shipping + tax for empty cart', () => {
      renderOrderSummary();
      expect(screen.getByText('TOTAL')).toBeInTheDocument();
      expect(screen.getByText('$15.00')).toBeInTheDocument();
    });

    it('should show checkout button', () => {
      renderOrderSummary();
      expect(screen.getByText('PROCEED TO CHECKOUT')).toBeInTheDocument();
    });
  });

  describe('With items in cart', () => {
    beforeEach(() => {
      store = mockStore({
        cart: {
          items: [
            { product: { id: 1, price: 50.0 }, quantity: 2 },
            { product: { id: 2, price: 25.5 }, quantity: 1 },
          ],
        },
      });
    });

    it('should show correct subtotal', () => {
      renderOrderSummary();
      // Subtotal: (50 * 2) + (25.5 * 1) = 125.5
      expect(screen.getByText('$125.50')).toBeInTheDocument();
    });

    it('should show correct total', () => {
      renderOrderSummary();
      // Total: 125.5 + 10 + 5 = 140.5
      expect(screen.getByText('$140.50')).toBeInTheDocument();
    });

    it('should still show same shipping and tax', () => {
      renderOrderSummary();
      expect(screen.getByText('$10.00')).toBeInTheDocument();
      expect(screen.getByText('$5.00')).toBeInTheDocument();
    });
  });

  describe('Checkout button', () => {
    beforeEach(() => {
      store = mockStore({
        cart: {
          items: [{ product: { id: 1, price: 10 }, quantity: 1 }],
        },
      });
    });

    it('should call handleCheckout when clicked', () => {
      renderOrderSummary();
      const checkoutButton = screen.getByText('PROCEED TO CHECKOUT');
      fireEvent.click(checkoutButton);
      expect(checkout.handleCheckout).toHaveBeenCalled();
    });
  });

  describe('Layout elements', () => {
    beforeEach(() => {
      store = mockStore({
        cart: {
          items: [],
        },
      });
    });

    it('should show all labels', () => {
      renderOrderSummary();
      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getByText('Shipping')).toBeInTheDocument();
      expect(screen.getByText('Tax')).toBeInTheDocument();
      expect(screen.getByText('TOTAL')).toBeInTheDocument();
    });

    it('should have divider between items and total', () => {
      const { container } = renderOrderSummary();
      const divider = container.querySelector('.order-summary-divider');
      expect(divider).toBeInTheDocument();
    });
  });

  describe('Different cart scenarios', () => {
    it('should handle single item', () => {
      store = mockStore({
        cart: {
          items: [{ product: { id: 1, price: 99.99 }, quantity: 1 }],
        },
      });
      renderOrderSummary();
      expect(screen.getByText('$99.99')).toBeInTheDocument();
      // Total: 99.99 + 15 = 114.99
      expect(screen.getByText('$114.99')).toBeInTheDocument();
    });

    it('should handle multiple quantities of same item', () => {
      store = mockStore({
        cart: {
          items: [{ product: { id: 1, price: 10 }, quantity: 5 }],
        },
      });
      renderOrderSummary();
      expect(screen.getByText('$50.00')).toBeInTheDocument();
      // Total: 50 + 15 = 65
      expect(screen.getByText('$65.00')).toBeInTheDocument();
    });
  });
});

