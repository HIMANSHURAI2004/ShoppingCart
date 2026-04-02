import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

jest.mock('../components/Navbar/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navbar</div>;
  };
});

jest.mock('../pages/ProductPage/ProductPage', () => {
  return function MockProductPage() {
    return <div data-testid="product-page">Product Page</div>;
  };
});

jest.mock('../pages/CartPage/CartPage', () => {
  return function MockCartPage() {
    return <div data-testid="cart-page">Cart Page</div>;
  };
});

const mockStore = configureStore([]);

describe('App', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] },
      products: { products: [], loading: false, error: null },
    });
  });

  const renderApp = (initialRoute = '/') => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render without crashing', () => {
    renderApp();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('should render Navbar component', () => {
    renderApp();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('should have App class', () => {
    const { container } = renderApp();
    expect(container.querySelector('.App')).toBeInTheDocument();
  });

  describe('Routing', () => {
    it('should render ProductPage on / route', () => {
      renderApp('/');
      expect(screen.getByTestId('product-page')).toBeInTheDocument();
      expect(screen.queryByTestId('cart-page')).not.toBeInTheDocument();
    });

    it('should render CartPage on /cart route', () => {
      renderApp('/cart');
      expect(screen.getByTestId('cart-page')).toBeInTheDocument();
      expect(screen.queryByTestId('product-page')).not.toBeInTheDocument();
    });

    it('should always render Navbar on product page', () => {
      renderApp('/');
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    it('should always render Navbar on cart page', () => {
      renderApp('/cart');
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });
  });
});

