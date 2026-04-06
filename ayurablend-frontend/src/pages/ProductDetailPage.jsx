import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';

export default function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 px-8 text-center flex flex-col justify-center items-center h-full">
        <p className="text-xl text-primary font-medium animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-24 px-8 text-center flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl font-serif text-primary mb-4">Product Not Found</h1>
        <p className="text-xl text-text-light mb-10">We couldn't find the product you're looking for, or the connection failed.</p>
        <Link to="/products" className="bg-primary text-white text-lg px-8 py-3 rounded-md hover:bg-primary-dim transition-colors inline-block">
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto overflow-hidden">
      <Link to="/products" className="text-text-light hover:text-primary mb-6 md:mb-8 inline-block transition-colors font-medium">
        &larr; Back to Products
      </Link>
      
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-4">
        <div className="md:w-1/2 w-full">
          <img 
            src={product.image} 
            alt={product.name} 
            onError={(e) => { e.target.onerror = null; e.target.src="https://picsum.photos/400"; }}
            className="w-full h-auto md:h-[550px] object-cover rounded-xl shadow-md border border-gray-100"
          />
        </div>
        
        <div className="md:w-1/2 w-full flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-text mb-6">₹{product.price}</p>
          
          <div className="w-16 h-1 bg-primary/30 mb-8 rounded-full"></div>
          
          <h3 className="text-lg font-medium text-text mb-2">Details</h3>
          <p className="text-text-light mb-10 leading-relaxed text-lg">
            {product.description}
          </p>
          
          <button 
            onClick={() => addToCart(product)}
            className="bg-primary min-h-[44px] text-white w-full py-4 rounded-md text-base sm:text-lg font-medium hover:bg-primary-dim transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
