import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartItemCard from '../CartItemCard';
import * as cartItemActions from '../helpers/cartItemActions';

jest.mock('../helpers/cartItemActions');

const mockStore = configureStore([]);

describe('CartItemCard', () => {
  let store;
  const mockCartItem = {
    product: {
      id: 1,
      name: 'Test Product',
      image: 'test.jpg',
      price: 50.0,
    },
    quantity: 2,
  };

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [],
      },
    });
    cartItemActions.handleIncreaseQuantity = jest.fn();
    cartItemActions.handleDecreaseQuantity = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderCartItemCard = (cartItem = mockCartItem) => {
    return render(
      <Provider store={store}>
        <CartItemCard cartItem={cartItem} />
      </Provider>
    );
  };

  it('should render product image', () => {
    renderCartItemCard();
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test.jpg');
  });

  it('should render product name', () => {
    renderCartItemCard();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should render product price', () => {
    renderCartItemCard();
    expect(screen.getByText('$ 50')).toBeInTheDocument();
  });

  it('should render quantity', () => {
    renderCartItemCard();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render subtotal', () => {
    renderCartItemCard();
    expect(screen.getByText('$ 100.00')).toBeInTheDocument();
  });

  it('should render subtotal label', () => {
    renderCartItemCard();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
  });

  describe('Quantity controls', () => {
    it('should show + and - buttons', () => {
      renderCartItemCard();
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(screen.getByText('+')).toBeInTheDocument();
      expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('should call handleIncreaseQuantity when + clicked', () => {
      renderCartItemCard();
      const increaseButton = screen.getByText('+');
      fireEvent.click(increaseButton);
      expect(cartItemActions.handleIncreaseQuantity).toHaveBeenCalled();
    });

    it('should call handleDecreaseQuantity when - clicked', () => {
      renderCartItemCard();
      const decreaseButton = screen.getByText('-');
      fireEvent.click(decreaseButton);
      expect(cartItemActions.handleDecreaseQuantity).toHaveBeenCalled();
    });
  });

  describe('Subtotal calculation', () => {
    it('should calculate correct subtotal for quantity 1', () => {
      const cartItem = { ...mockCartItem, quantity: 1 };
      renderCartItemCard(cartItem);
      expect(screen.getByText('$ 50.00')).toBeInTheDocument();
    });

    it('should calculate correct subtotal for quantity 3', () => {
      const cartItem = { ...mockCartItem, quantity: 3 };
      renderCartItemCard(cartItem);
      expect(screen.getByText('$ 150.00')).toBeInTheDocument();
    });

    it('should format subtotal with two decimals', () => {
      const cartItem = {
        product: { ...mockCartItem.product, price: 10.5 },
        quantity: 3,
      };
      renderCartItemCard(cartItem);
      expect(screen.getByText('$ 31.50')).toBeInTheDocument();
    });
  });

  describe('Different products', () => {
    it('should render different product correctly', () => {
      const cartItem = {
        product: {
          id: 2,
          name: 'Another Product',
          image: 'another.jpg',
          price: 25.99,
        },
        quantity: 1,
      };
      renderCartItemCard(cartItem);
      expect(screen.getByText('Another Product')).toBeInTheDocument();
      const priceElements = screen.getAllByText('$ 25.99');
      expect(priceElements.length).toBeGreaterThan(0);
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});

