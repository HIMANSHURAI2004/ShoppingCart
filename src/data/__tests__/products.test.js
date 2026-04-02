import products from '../products';

describe('products data', () => {
  it('should be an array', () => {
    expect(Array.isArray(products)).toBe(true);
  });

  it('should contain 10 products', () => {
    expect(products).toHaveLength(10);
  });

  it('should have all products with required fields', () => {
    products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
    });
  });

  it('should have unique product IDs', () => {
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(products.length);
  });

  it('should have all products with valid prices', () => {
    products.forEach((product) => {
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
    });
  });

  it('should have all products with string names', () => {
    products.forEach((product) => {
      expect(typeof product.name).toBe('string');
      expect(product.name.length).toBeGreaterThan(0);
    });
  });

  it('should have all products with string images', () => {
    products.forEach((product) => {
      expect(typeof product.image).toBe('string');
      expect(product.image.length).toBeGreaterThan(0);
    });
  });

  it('should have all products with string categories', () => {
    products.forEach((product) => {
      expect(typeof product.category).toBe('string');
      expect(product.category.length).toBeGreaterThan(0);
    });
  });

  it('should have sequential IDs starting from 1', () => {
    products.forEach((product, index) => {
      expect(product.id).toBe(index + 1);
    });
  });

  describe('Product categories', () => {
    it('should have valid categories', () => {
      const validCategories = ['Footwear', 'Accessories', 'Electronics', 'Fitness'];
      products.forEach((product) => {
        expect(validCategories).toContain(product.category);
      });
    });
  });

  describe('Specific products', () => {
    it('should have Nike Running Shoes as first product', () => {
      expect(products[0].name).toBe('Nike Running Shoes');
      expect(products[0].id).toBe(1);
    });

    it('should have Stainless Steel Water Bottle as second product', () => {
      expect(products[1].name).toBe('Stainless Steel Water Bottle');
      expect(products[1].id).toBe(2);
    });

    it('should have Dumbbell Set as last product', () => {
      expect(products[9].name).toBe('Dumbbell Set');
      expect(products[9].id).toBe(10);
    });
  });
});

