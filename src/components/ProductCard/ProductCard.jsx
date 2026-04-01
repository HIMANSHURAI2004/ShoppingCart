import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

import { addItem, increaseQuantity, decreaseQuantity } from "../../redux/actions/cartActions";
import { selectProductQuantity } from "../../redux/selectors/cartSelectors";

import { handleAddProductToCart } from './helpers/productActions';
import { handleIncreaseQuantity, handleDecreaseQuantity } from '../CartItemCard/helpers/cartItemActions';

import "./ProductCard.css";

function ProductCard({product}) {
  const dispatch = useDispatch();
  
  const quantityInCart = useSelector((state) => 
    selectProductQuantity(state, product.id)
  );

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
      />

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>

        {quantityInCart === 0 ? (
          <button
            className="product-btn"
            onClick={() => handleAddProductToCart(dispatch, addItem, product)}
          >
            Add to Cart
          </button>
        ) : (
          <div className="product-quantity-controls">
            <button 
              className="product-qty-btn"
              onClick={() => handleDecreaseQuantity(dispatch, decreaseQuantity, product.id)}
            >
              -
            </button>
            <span className="product-quantity">{quantityInCart}</span>
            <button 
              className="product-qty-btn"
              onClick={() => handleIncreaseQuantity(dispatch, increaseQuantity, product.id)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
};
export default ProductCard;