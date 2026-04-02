import toast from 'react-hot-toast';

export const handleAddProductToCart = (dispatch, addItemAction, product) => {
    toast.success('Added to Cart');
    dispatch(addItemAction(product));
};

