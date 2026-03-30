import React from 'react'
import './OrderSummaryCard.css'
import toast from 'react-hot-toast'

function OrderSummaryCard({subtotal,setCartItems}) {

    const onCheckoutClick = () => {
        toast.success('Checkout Successful')
        setCartItems([]);
    }
    return (
        <div className='order-summary-card'>
            <h2 className='order-summary-title'>ORDER SUMMARY</h2>

            <div className='order-summary-row'>
                <p className='order-summary-label'>Subtotal</p>
                <p className='order-summary-value'>${subtotal.toFixed(2)}</p>
            </div>

            <div className='order-summary-row'>
                <p className='order-summary-label'>Shipping</p>
                <p className='order-summary-value'>$10.00</p>
            </div>

            <div className='order-summary-row'>
                <p className='order-summary-label'>Tax</p>
                <p className='order-summary-value'>$5.00</p>
            </div>

            <hr className='order-summary-divider' />

            <div className='order-summary-total'>
                <p className='order-total-label'>TOTAL</p>
                <p className='order-total-value'>${(subtotal + 15).toFixed(2)}</p>
            </div>

            <button className='checkout-btn' onClick={onCheckoutClick}>PROCEED TO CHECKOUT</button>
        </div>
    )
}

export default OrderSummaryCard