import {
    SET_LOADING,
    SET_PRODUCTS,
    SET_ERROR,
} from '../constants/actionTypes';

export const setLoading = () => ({
    type: SET_LOADING,
});

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});