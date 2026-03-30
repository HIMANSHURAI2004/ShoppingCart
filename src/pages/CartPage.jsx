import React from 'react'
import "./CartPage.css"
import CartItemCard from '../components/CartItemCard'
import OrderSummaryCard from '../components/OrderSummaryCard'
function CartPage({cartItems,onQuantityDecrease,onQuantityIncrease,setCartItems}) {

    const subtotal = cartItems.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
    );
    if(cartItems.length <= 0){
        return (
            <div className='empty-cart'>
                <h2>Cart Empty</h2>
                <img
                    className='cart-page-logo'
                    src='src/assets/shopping-cart.png'
                    alt='cart'
                />
                <p>
                    No Items In the cart
                </p>
            </div>
        )
    }

    return (
        <div className='cart-page'>
            <div>
                {
                    cartItems.map((cartItem) => (
                        <CartItemCard
                            cartItem={cartItem}
                            onQuantityDecrease={onQuantityDecrease}
                            onQuantityIncrease={onQuantityIncrease}
                            key={cartItem.product.id}
                        />
                    ))
                }
            </div>
            <div className='order-summary-card'>
                <OrderSummaryCard subtotal={subtotal} setCartItems={setCartItems}/>
            </div>
        </div>
    )
}

export default CartPage