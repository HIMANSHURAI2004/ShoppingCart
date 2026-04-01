import products from '../../../data/products';
import { MOCK_API_DELAY_MS } from '../../../constants/appConstants';

export const mockFetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, MOCK_API_DELAY_MS);
    });
};