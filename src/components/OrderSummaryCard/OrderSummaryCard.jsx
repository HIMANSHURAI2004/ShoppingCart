import { useDispatch, useSelector } from 'react-redux';

import { clearCart } from '../../redux/actions/cartActions';
import { selectCartTotal } from '../../redux/selectors/cartSelectors';

import { ADDITIONAL_CHARGES, SHIPPING_COST, TAX_AMOUNT } from '../../constants/appConstants';

import { handleCheckout } from './helpers/checkout';

import './OrderSummaryCard.css'
import { formatPrice } from '../../helpers/formatters';

function OrderSummaryCard() {

    const dispatch = useDispatch();
    const subtotal = useSelector(selectCartTotal);

    return (
        <div className='order-summary-card'>
            <h2 className='order-summary-title'>ORDER SUMMARY</h2>

            <div className='order-summary-row'>
                <p className='order-summary-label'>Subtotal</p>
                <p className='order-summary-value'>${formatPrice(subtotal)}</p>
            </div>

            <div className='order-summary-row'>
                <p className='order-summary-label'>Shipping</p>
                <p className='order-summary-value'>${formatPrice(SHIPPING_COST)}</p>
            </div>

            <div className='order-summary-row'>
                <p className='order-summary-label'>Tax</p>
                <p className='order-summary-value'>${formatPrice(TAX_AMOUNT)}</p>
            </div>

            <hr className='order-summary-divider' />

            <div className='order-summary-total'>
                <p className='order-total-label'>TOTAL</p>
                <p className='order-total-value'>${formatPrice(subtotal + ADDITIONAL_CHARGES)}</p>
            </div>

            <button className='checkout-btn' onClick={() => handleCheckout(dispatch, clearCart)}>PROCEED TO CHECKOUT</button>
        </div>
    )
}

export default OrderSummaryCard