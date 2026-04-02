import { mockFetchProducts } from '../mockApi';
import products from '../../../../data/products';

// Mock the delay
jest.mock('../../../../constants/appConstants', () => ({
  MOCK_API_DELAY_MS: 0,
}));

describe('mockApi', () => {
  describe('mockFetchProducts', () => {
    it('should return products after delay', async () => {
      const result = await mockFetchProducts();
      expect(result).toEqual(products);
    });

    it('should return array of products', async () => {
      const result = await mockFetchProducts();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return products with correct structure', async () => {
      const result = await mockFetchProducts();
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('price');
      expect(result[0]).toHaveProperty('image');
      expect(result[0]).toHaveProperty('category');
    });
  });
});

