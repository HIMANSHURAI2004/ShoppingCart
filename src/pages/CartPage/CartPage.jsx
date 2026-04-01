import { useSelector } from 'react-redux';

import { selectCartItems } from '../../redux/selectors/cartSelectors';

import CartItemCard from '../../components/CartItemCard/CartItemCard'
import OrderSummaryCard from '../../components/OrderSummaryCard/OrderSummaryCard'

import "./CartPage.css"

function CartPage() {

    const cartItems  = useSelector(selectCartItems);
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
                            key={cartItem.product.id}
                        />
                    ))
                }
            </div>
            <div className='order-summary-card'>
                <OrderSummaryCard/>
            </div>
        </div>
    )
}

export default CartPage