import "./ProductCard.css";

function ProductCard({ product, handleAddToCart }) {
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

        <button
          className="product-btn"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;