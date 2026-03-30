import ProductCard from '../components/ProductCard'
import "./ProductPage.css"

function ProductPage({products,handleAddToCart}) {
    return (
        <section className='products'>
            <div className="products-grid">
                {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                />
                ))}
            </div>
    </section>
    )
}

export default ProductPage