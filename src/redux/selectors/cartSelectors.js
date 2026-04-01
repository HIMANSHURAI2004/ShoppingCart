export const selectCartItemCount = (state) => {
    return state.cart?.items?.length || 0;
};

export const selectCartTotal = (state) => {
    return state.cart?.items?.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
    ) || 0;
    
};

export const selectCartItems = (state) => {
    return state.cart?.items || [];
};

export const selectProductQuantity = (state, productId) => {
    const cartItem = state.cart?.items?.find(
        item => item.product.id === productId
    );
    return cartItem ? cartItem.quantity : 0;
};