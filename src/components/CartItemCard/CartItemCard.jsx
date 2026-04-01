import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { decreaseQuantity, increaseQuantity } from '../../redux/actions/cartActions';

import { handleIncreaseQuantity, handleDecreaseQuantity } from './helpers/cartItemActions';
import { calculateItemSubtotal } from './helpers/priceCalculations';

import "./CartItemCard.css"

function CartItemCard({cartItem}) {
    const dispatch = useDispatch();

    return (
        <div className='cart-item-card'>
            <div className='cart-item-image-wrapper'>
                <img
                    className="cart-item-image"
                    src={cartItem.product.image}
                    alt={cartItem.product.name}
                />
            </div>
            <div className='cart-item-info'>
                <div>
                    <div className='cart-item-details'>
                        <h2 className='cart-item-name'>{cartItem.product.name}</h2>
                        <div className='item-quantity'>
                            <button className='cart-item-qty-btn' onClick={() => handleDecreaseQuantity(dispatch, decreaseQuantity, cartItem.product.id)}>
                                -
                            </button>
                            <p className='cart-item-quantity'>{cartItem.quantity}</p>
                            <button className='cart-item-qty-btn' onClick={() => handleIncreaseQuantity(dispatch, increaseQuantity, cartItem.product.id)}>
                                +
                            </button>
                        </div>
                    </div>
                    <p className='cart-item-price'>$ {cartItem.product.price}</p>
                </div>
                <div className='cart-item-footer'>
                    <p className='subtotal-label'>Subtotal</p>
                    <p className='cart-item-subtotal'>$ {calculateItemSubtotal(cartItem.product.price, cartItem.quantity)}</p>
                </div>
            </div>
        </div>
    )
}

CartItemCard.propTypes = {
    cartItem: PropTypes.shape({
        product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
};

export default CartItemCard