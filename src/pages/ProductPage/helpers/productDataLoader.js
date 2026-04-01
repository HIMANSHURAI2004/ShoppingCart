import { setError, setLoading, setProducts } from '../../../redux/actions/productActions';
import { mockFetchProducts } from './mockApi';

export const loadProductData = async (dispatch) => {
    dispatch(setLoading());
    
    try {
        const data = await mockFetchProducts();
        dispatch(setProducts(data));
    } catch (err) {
        dispatch(setError(err.message || 'Failed to fetch products'));
    }
};