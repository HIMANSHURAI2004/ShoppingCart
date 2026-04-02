import { ADD_ITEM, CLEAR_CART, DECREASE_QUANTITY, INCREASE_QUANTITY } from "../constants/actionTypes";



export const addItem = (product) => ({
    type: ADD_ITEM,
    payload: product,
});

export const increaseQuantity = (productId) => ({
    type: INCREASE_QUANTITY,
    payload: productId,
});

export const decreaseQuantity = (productId) => ({
    type: DECREASE_QUANTITY,
    payload: productId,
});

export const clearCart = () => ({
    type: CLEAR_CART,
});