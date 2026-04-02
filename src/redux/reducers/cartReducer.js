import {
    ADD_ITEM,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    CLEAR_CART,
} from '../constants/actionTypes';

const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            const existingIndex = state.items.findIndex(
                (item) => item.product.id === action.payload.id
            );

            if (existingIndex !== -1) {
                return {
                ...state,
                items: state.items.map((item, index) =>
                    index === existingIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
                };
            }

            return {
                ...state,
                items: [...state.items, { product: action.payload, quantity: 1 }],
            };
        }

        case INCREASE_QUANTITY: {
            return {
                ...state,
                items: state.items.map((item) =>
                item.product.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
            };
        }

        case DECREASE_QUANTITY: {
            return {
                ...state,
                items: state.items
                .map((item) =>
                    item.product.id === action.payload
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
                .filter((item) => item.quantity > 0),
            };
        }

        case CLEAR_CART: {
            return {
                ...state,
                items: [],
            };
        }

        default:
            return state;
    }
};

export default cartReducer;