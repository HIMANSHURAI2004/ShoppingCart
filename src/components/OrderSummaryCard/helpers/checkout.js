import toast from 'react-hot-toast';

export const handleCheckout = (dispatch, clearCartAction) => {
    toast.success('Checkout Successful');
    dispatch(clearCartAction());
};

