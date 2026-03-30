import React from 'react'
import "./CartItemCard.css"
function CartItemCard({cartItem,onQuantityIncrease,onQuantityDecrease}) {
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
                        <button className='cart-item-qty-btn' onClick={() => onQuantityDecrease(cartItem.product.id)}>
                            -
                        </button>
                        <p className='cart-item-quantity'>{cartItem.quantity}</p>
                        <button className='cart-item-qty-btn' onClick={() => onQuantityIncrease(cartItem.product.id)}>
                            +
                        </button>
                    </div>
                </div>
                <p className='cart-item-price'>$ {cartItem.product.price}</p>
            </div>
            <div className='cart-item-footer'>
                <p className='subtotal-label'>Subtotal</p>
                <p className='cart-item-subtotal'>$ {(cartItem.product.price * cartItem.quantity).toFixed(2)}</p>
            </div>
        </div>
    </div>
  )
}

export default CartItemCard