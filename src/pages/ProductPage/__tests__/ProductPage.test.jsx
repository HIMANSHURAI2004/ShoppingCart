import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductPage from '../ProductPage';
import * as productDataLoader from '../helpers/productDataLoader';

jest.mock('../helpers/productDataLoader');
jest.mock('../../../components/ProductCard/ProductCard', () => {
  return function MockProductCard({ product }) {
    return <div data-testid="product-card">{product.name}</div>;
  };
});

const mockStore = configureStore([]);

describe('ProductPage', () => {
  let store;

  beforeEach(() => {
    productDataLoader.loadProductData = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading state', () => {
    beforeEach(() => {
      store = mockStore({
        products: {
          products: [],
          loading: true,
          error: null,
        },
      });
    });

    it('should show spinner when loading', () => {
      const { container } = render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      const spinner = container.querySelector('.spinner-overlay');
      expect(spinner).toBeInTheDocument();
    });

    it('should call loadProductData on mount', () => {
      render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      expect(productDataLoader.loadProductData).toHaveBeenCalled();
    });
  });

  describe('Error state', () => {
    beforeEach(() => {
      store = mockStore({
        products: {
          products: [],
          loading: false,
          error: 'Failed to fetch products',
        },
      });
    });

    it('should show error message', () => {
      render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
      expect(screen.getByText(/Failed to fetch products/)).toBeInTheDocument();
    });

    it('should not show spinner when error', () => {
      const { container } = render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      const spinner = container.querySelector('.spinner-overlay');
      expect(spinner).not.toBeInTheDocument();
    });

    it('should not show products when error', () => {
      render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
    });
  });

  describe('Success state with products', () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 10, image: 'img1.jpg', category: 'Cat1' },
      { id: 2, name: 'Product 2', price: 20, image: 'img2.jpg', category: 'Cat2' },
      { id: 3, name: 'Product 3', price: 30, image: 'img3.jpg', category: 'Cat3' },
    ];

    beforeEach(() => {
      store = mockStore({
        products: {
          products: mockProducts,
          loading: false,
          error: null,
        },
      });
    });

    it('should render all products', () => {
      render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      expect(screen.getAllByTestId('product-card')).toHaveLength(3);
    });

    it('should render each product with correct name', () => {
      render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
    });

    it('should not show spinner', () => {
      const { container } = render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      const spinner = container.querySelector('.spinner-overlay');
      expect(spinner).not.toBeInTheDocument();
    });

    it('should not show error', () => {
      render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
    });
  });

  describe('Empty products state', () => {
    beforeEach(() => {
      store = mockStore({
        products: {
          products: [],
          loading: false,
          error: null,
        },
      });
    });

    it('should render products section with no items', () => {
      const { container } = render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      const productsSection = container.querySelector('.products');
      expect(productsSection).toBeInTheDocument();
    });

    it('should not show any product cards', () => {
      render(
        <Provider store={store}>
          <ProductPage />
        </Provider>
      );
      expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
    });
  });
});

