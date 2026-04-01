import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';


import ProductCard from '../../components/ProductCard/ProductCard'
import Spinner from '../../components/Spinner/Spinner';

import "./ProductPage.css"
import { loadProductData } from './helpers/productDataLoader';


function ProductPage() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        loadProductData(dispatch);
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div className='error-message'>
                Error: {error}
            </div>
        );
    }

    return (
        <section className='products'>
            <div className="products-grid">
                {products.map((product) => (
                <ProductCard
                        key={product.id}
                        product={product}
                />
                ))}
            </div>
    </section>
    )
}

export default ProductPage