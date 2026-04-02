import {
    SET_LOADING,
    SET_PRODUCTS,
    SET_ERROR,
} from '../constants/actionTypes';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };

        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            };

        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};

export default productsReducer;