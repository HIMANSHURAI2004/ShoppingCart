import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from '../Navbar';

const mockStore = configureStore([]);

describe('Navbar', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [],
      },
    });
  });

  const renderWithRouter = (initialRoute = '/') => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );
  };

  describe('On Product Page', () => {
    it('should display "Shop" title on product page', () => {
      renderWithRouter('/');
      expect(screen.getByText('Shop')).toBeInTheDocument();
    });

    it('should show cart link on product page', () => {
      renderWithRouter('/');
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/cart');
    });

    it('should show cart icon on product page', () => {
      const { container } = renderWithRouter('/');
      const cartLogo = container.querySelector('.cart-logo');
      expect(cartLogo).toBeInTheDocument();
    });

    it('should not show cart count when cart is empty', () => {
      const { container } = renderWithRouter('/');
      const cartCount = container.querySelector('.cart-count');
      expect(cartCount).not.toBeInTheDocument();
    });

    it('should show cart count when cart has items', () => {
      store = mockStore({
        cart: {
          items: [
            { product: { id: 1 }, quantity: 2 },
            { product: { id: 2 }, quantity: 1 },
          ],
        },
      });
      renderWithRouter('/');
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  describe('On Cart Page', () => {
    it('should display "Your Cart" title on cart page', () => {
      renderWithRouter('/cart');
      expect(screen.getByText('Your Cart')).toBeInTheDocument();
    });

    it('should show products link on cart page', () => {
      renderWithRouter('/cart');
      expect(screen.getByText('Go to Products')).toBeInTheDocument();
    });

    it('should have link to products page', () => {
      renderWithRouter('/cart');
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/');
    });

    it('should not show cart icon on cart page', () => {
      const { container } = renderWithRouter('/cart');
      const cartLogo = container.querySelector('.cart-logo');
      expect(cartLogo).not.toBeInTheDocument();
    });
  });

  describe('Cart count display', () => {
    it('should display correct count with multiple items', () => {
      store = mockStore({
        cart: {
          items: [
            { product: { id: 1 }, quantity: 1 },
            { product: { id: 2 }, quantity: 1 },
            { product: { id: 3 }, quantity: 1 },
          ],
        },
      });
      renderWithRouter('/');
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should display 1 when only one item in cart', () => {
      store = mockStore({
        cart: {
          items: [{ product: { id: 1 }, quantity: 2 }],
        },
      });
      renderWithRouter('/');
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});

