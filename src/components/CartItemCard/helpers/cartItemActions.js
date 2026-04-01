
export const handleIncreaseQuantity = (dispatch, increaseQuantityAction, productId) => {
    dispatch(increaseQuantityAction(productId));
};

export const handleDecreaseQuantity = (dispatch, decreaseQuantityAction, productId) => {
    dispatch(decreaseQuantityAction(productId));
};

