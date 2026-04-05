import React from 'react';

const products = [
  { id: 1, name: 'Calm Mist', price: '₹499', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Herbal Tonic', price: '₹799', image: 'https://images.unsplash.com/photo-1615397323358-1a520ca4de2c?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Lavender Essential Oil', price: '₹599', image: 'https://images.unsplash.com/photo-1596489370830-ec3315a6bfa9?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Wellness Kit', price: '₹2499', image: 'https://images.unsplash.com/photo-1556228578-8d262b9dd01b?auto=format&fit=crop&q=80&w=400' },
];

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 px-8 bg-bg border-b border-gray-200">
      <div className="text-2xl font-serif font-bold text-primary tracking-wide">AyuraBlend</div>
      <div className="hidden md:flex gap-8 text-text">
        <a href="#" className="hover:text-primary transition-colors">Home</a>
        <a href="#" className="hover:text-primary transition-colors">Products</a>
        <a href="#" className="hover:text-primary transition-colors">About</a>
        <a href="#" className="hover:text-primary transition-colors">Contact</a>
      </div>
      <div>
        <button className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dim transition-colors cursor-pointer">Cart (0)</button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="bg-bg py-24 px-8 text-center flex flex-col justify-center items-center">
      <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">AyuraBlend</h1>
      <p className="text-xl md:text-2xl text-text-light max-w-2xl mx-auto mb-10">Mindful living, naturally curated.</p>
      <button className="bg-primary text-white text-lg px-8 py-3 rounded-md hover:bg-primary-dim transition-colors cursor-pointer">Shop the Collection</button>
    </div>
  );
}

function ProductGrid() {
  return (
    <div className="py-16 px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif text-primary mb-10 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-medium text-text mb-2">{product.name}</h3>
              <p className="text-primary font-semibold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-bg py-12 px-8 text-center mt-auto flex flex-col items-center">
      <div className="font-serif text-2xl mb-6">AyuraBlend</div>
      <div className="flex gap-6 mb-8 text-primary-content">
        <a href="#" className="hover:text-white transition-colors">Instagram</a>
        <a href="#" className="hover:text-white transition-colors">Facebook</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
      </div>
      <p className="text-sm opacity-80">&copy; 2026 AyuraBlend. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
