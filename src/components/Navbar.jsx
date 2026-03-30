import {Link, useLocation } from 'react-router-dom'
import "./Navbar.css"
function Navbar({cartItemCount}) {
    const location = useLocation();
    const isProductPage = location.pathname == '/'
    const isCartPage = location.pathname == '/cart'
    return (
        <nav className='navbar'>
            <div className='app-name'>
                {
                    isProductPage &&
                    <p>Shop</p>
                }
                {
                    isCartPage &&
                    <p>Your Cart</p>
                }
            </div>
            <div>
                {
                    isProductPage &&
                    <Link to="/cart" className="header-link">
                        <div className='cart'>
                            <img
                                className='cart-logo'
                                src='src/assets/shopping-cart.png'
                                alt='cart'
                            />
                            {cartItemCount > 0 && (
                            <span className="cart-count">{cartItemCount}</span>
                            )}
                        </div>
                    </Link>
                }
                {
                    isCartPage && 
                    <Link to="/" className="header-link">
                        <span className='product-button'>Go to Products</span>
                    </Link>
                }
            </div>
            
        
        </nav>
    )
}

export default Navbar