import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import { useState } from 'react'
import products from './data/products'

function App() {
  const [cartItems,setCartItems] = useState([]);

  const cartItemCount = cartItems.length;
  
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex !== -1) {
        const updated = prevItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity }
            : item
        );
        return updated;
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleQuantityIncrease = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleQuantityDecrease = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className='App'>
      <Navbar cartItemCount={cartItemCount}/>
      <Routes>
        <Route path='/' element={<ProductPage products={products} handleAddToCart={handleAddToCart}/>}/>
        <Route path='/cart' element={
          <CartPage 
            cartItems={cartItems} 
            onQuantityDecrease={handleQuantityDecrease} 
            onQuantityIncrease={handleQuantityIncrease}
            setCartItems={setCartItems}
          />
        }/>
      </Routes>
    </div>
  )
}

export default App
