import React, { useState, useEffect } from 'react';
import ProductList from '../components/products/ProductList';
import { getAllProducts } from '../services/productService';

export default function ProductsPage({ addToCart }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProductList(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-serif text-primary mb-6 text-center">All Products</h1>
      <p className="text-center text-text-light mb-12 max-w-2xl mx-auto">Browse our full collection of natural remedies, essential oils, and wellness kits carefully curated to bring balance to your daily life.</p>
      
      {loading ? (
         <div className="flex flex-col items-center justify-center py-24">
           <svg className="animate-spin h-12 w-12 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           <div className="text-primary font-medium text-lg tracking-wide animate-pulse">Curating natural remedies...</div>
         </div>
      ) : error ? (
         <div className="flex items-center justify-center py-16">
           <div className="bg-red-50 border border-red-100 text-red-700 px-8 py-6 rounded-xl shadow-sm text-center max-w-lg flex flex-col items-center">
             <svg className="w-10 h-10 mb-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <span className="font-semibold text-lg mb-1">Connection Interrupted</span>
             <p className="text-sm opacity-90">We're unable to load our products right now. Please refresh the page or try again later.</p>
           </div>
         </div>
      ) : (
         <ProductList products={productList} addToCart={addToCart} />
      )}
    </div>
  );
}
