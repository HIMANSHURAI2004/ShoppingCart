import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartPage from '../CartPage';

jest.mock('../../../components/CartItemCard/CartItemCard', () => {
  return function MockCartItemCard({ cartItem }) {
    return <div data-testid="cart-item-card">{cartItem.product.name}</div>;
  };
});

jest.mock('../../../components/OrderSummaryCard/OrderSummaryCard', () => {
  return function MockOrderSummaryCard() {
    return <div data-testid="order-summary-card">Order Summary</div>;
  };
});

const mockStore = configureStore([]);

describe('CartPage', () => {
  let store;

  describe('Empty cart', () => {
    beforeEach(() => {
      store = mockStore({
        cart: {
          items: [],
        },
      });
    });

    it('should show empty cart message', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.getByText('Cart Empty')).toBeInTheDocument();
    });

    it('should show "No Items In the cart" message', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.getByText('No Items In the cart')).toBeInTheDocument();
    });

    it('should show cart image', () => {
      const { container } = render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      const cartImage = container.querySelector('.cart-page-logo');
      expect(cartImage).toBeInTheDocument();
    });

    it('should not show cart items', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.queryByTestId('cart-item-card')).not.toBeInTheDocument();
    });

    it('should not show order summary', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.queryByTestId('order-summary-card')).not.toBeInTheDocument();
    });
  });

  describe('Cart with items', () => {
    const mockCartItems = [
      {
        product: { id: 1, name: 'Product 1', price: 10, image: 'img1.jpg' },
        quantity: 2,
      },
      {
        product: { id: 2, name: 'Product 2', price: 20, image: 'img2.jpg' },
        quantity: 1,
      },
    ];

    beforeEach(() => {
      store = mockStore({
        cart: {
          items: mockCartItems,
        },
      });
    });

    it('should render all cart items', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.getAllByTestId('cart-item-card')).toHaveLength(2);
    });

    it('should render each cart item with correct name', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    it('should show order summary card', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.getByTestId('order-summary-card')).toBeInTheDocument();
    });

    it('should not show empty cart message', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.queryByText('Cart Empty')).not.toBeInTheDocument();
    });

    it('should not show "No Items In the cart" message', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.queryByText('No Items In the cart')).not.toBeInTheDocument();
    });
  });

  describe('Cart with single item', () => {
    beforeEach(() => {
      store = mockStore({
        cart: {
          items: [
            {
              product: { id: 1, name: 'Single Product', price: 50, image: 'img.jpg' },
              quantity: 1,
            },
          ],
        },
      });
    });

    it('should render single cart item', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.getAllByTestId('cart-item-card')).toHaveLength(1);
    });

    it('should show order summary', () => {
      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(screen.getByTestId('order-summary-card')).toBeInTheDocument();
    });
  });

  describe('Cart structure', () => {
    beforeEach(() => {
      store = mockStore({
        cart: {
          items: [
            {
              product: { id: 1, name: 'Product', price: 10, image: 'img.jpg' },
              quantity: 1,
            },
          ],
        },
      });
    });

    it('should have cart-page container', () => {
      const { container } = render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(container.querySelector('.cart-page')).toBeInTheDocument();
    });

    it('should have order-summary-card container', () => {
      const { container } = render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );
      expect(container.querySelector('.order-summary-card')).toBeInTheDocument();
    });
  });
});

