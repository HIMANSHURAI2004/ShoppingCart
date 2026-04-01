import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import ProductPage from './pages/ProductPage/ProductPage'
import CartPage from './pages/CartPage/CartPage'

import './App.css'

function App() {
  

  return (
    <div className='App'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
      </Routes>
    </div>
  )
}

export default App
