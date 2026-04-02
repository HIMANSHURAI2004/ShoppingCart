import { loadProductData } from '../productDataLoader';
import { setError, setLoading, setProducts } from '../../../../redux/actions/productActions';
import { mockFetchProducts } from '../mockApi';

jest.mock('../mockApi');
jest.mock('../../../../redux/actions/productActions');

describe('productDataLoader', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    setLoading.mockReturnValue({ type: 'SET_LOADING' });
    setProducts.mockImplementation((products) => ({ type: 'SET_PRODUCTS', payload: products }));
    setError.mockImplementation((error) => ({ type: 'SET_ERROR', payload: error }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadProductData', () => {
    it('should dispatch setLoading before fetching', async () => {
      const products = [{ id: 1, name: 'Product 1' }];
      mockFetchProducts.mockResolvedValue(products);

      await loadProductData(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING' });
    });

    it('should dispatch setProducts on successful fetch', async () => {
      const products = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];
      mockFetchProducts.mockResolvedValue(products);

      await loadProductData(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_PRODUCTS',
        payload: products,
      });
    });

    it('should dispatch setError on fetch failure', async () => {
      const errorMessage = 'Network error';
      mockFetchProducts.mockRejectedValue(new Error(errorMessage));

      await loadProductData(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ERROR',
        payload: errorMessage,
      });
    });

    it('should use default error message when error has no message', async () => {
      mockFetchProducts.mockRejectedValue({});

      await loadProductData(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ERROR',
        payload: 'Failed to fetch products',
      });
    });

    it('should call dispatch in correct order on success', async () => {
      const products = [{ id: 1, name: 'Product 1' }];
      mockFetchProducts.mockResolvedValue(products);

      await loadProductData(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'SET_LOADING' });
      expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: 'SET_PRODUCTS',
        payload: products,
      });
    });

    it('should call dispatch in correct order on error', async () => {
      mockFetchProducts.mockRejectedValue(new Error('Error'));

      await loadProductData(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'SET_LOADING' });
      expect(mockDispatch.mock.calls[1][0].type).toBe('SET_ERROR');
    });
  });
});

