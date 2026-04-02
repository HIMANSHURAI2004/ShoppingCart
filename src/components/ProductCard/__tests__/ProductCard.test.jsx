import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductCard from '../ProductCard';
import * as productActions from '../helpers/productActions';
import * as cartItemActions from '../../CartItemCard/helpers/cartItemActions';

jest.mock('../helpers/productActions');
jest.mock('../../CartItemCard/helpers/cartItemActions');

const mockStore = configureStore([]);

describe('ProductCard', () => {
  let store;
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    image: 'test.jpg',
    price: 99.99,
    category: 'Test Category',
  };

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [],
      },
    });
    productActions.handleAddProductToCart = jest.fn();
    cartItemActions.handleIncreaseQuantity = jest.fn();
    cartItemActions.handleDecreaseQuantity = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderProductCard = (product = mockProduct) => {
    return render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );
  };

  it('should render product image', () => {
    renderProductCard();
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test.jpg');
  });

  it('should render product name', () => {
    renderProductCard();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should render product category', () => {
    renderProductCard();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('should render formatted product price', () => {
    renderProductCard();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  describe('When product not in cart', () => {
    it('should show "Add to Cart" button', () => {
      renderProductCard();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });

    it('should call handleAddProductToCart when Add to Cart clicked', () => {
      renderProductCard();
      const addButton = screen.getByText('Add to Cart');
      fireEvent.click(addButton);
      expect(productActions.handleAddProductToCart).toHaveBeenCalled();
    });
  });

  describe('When product in cart', () => {
    beforeEach(() => {
      store = mockStore({
        cart: {
          items: [{ product: mockProduct, quantity: 2 }],
        },
      });
    });

    it('should show quantity controls', () => {
      renderProductCard();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('+')).toBeInTheDocument();
      expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('should not show "Add to Cart" button', () => {
      renderProductCard();
      expect(screen.queryByText('Add to Cart')).not.toBeInTheDocument();
    });

    it('should call handleIncreaseQuantity when + clicked', () => {
      renderProductCard();
      const increaseButton = screen.getByText('+');
      fireEvent.click(increaseButton);
      expect(cartItemActions.handleIncreaseQuantity).toHaveBeenCalled();
    });

    it('should call handleDecreaseQuantity when - clicked', () => {
      renderProductCard();
      const decreaseButton = screen.getByText('-');
      fireEvent.click(decreaseButton);
      expect(cartItemActions.handleDecreaseQuantity).toHaveBeenCalled();
    });
  });

  describe('Price formatting', () => {
    it('should format integer prices with two decimals', () => {
      const product = { ...mockProduct, price: 10 };
      renderProductCard(product);
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    it('should format prices with one decimal correctly', () => {
      const product = { ...mockProduct, price: 10.5 };
      renderProductCard(product);
      expect(screen.getByText('$10.50')).toBeInTheDocument();
    });
  });

  describe('Quantity display', () => {
    it('should display quantity 1 when product added once', () => {
      store = mockStore({
        cart: {
          items: [{ product: mockProduct, quantity: 1 }],
        },
      });
      renderProductCard();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should display correct quantity for multiple items', () => {
      store = mockStore({
        cart: {
          items: [{ product: mockProduct, quantity: 5 }],
        },
      });
      renderProductCard();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });
});

