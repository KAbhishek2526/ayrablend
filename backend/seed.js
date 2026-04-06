const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ayurablend';

const dummyProducts = [
  { 
    name: 'Calm Mist', 
    price: 499, 
    image: 'https://picsum.photos/400', 
    description: 'A soothing mist to help you relax and destress after a long day.',
    category: 'Aromatherapy'
  },
  { 
    name: 'Herbal Tonic', 
    price: 799, 
    image: 'https://picsum.photos/400', 
    description: 'Daily wellness tonic to boost immunity and energy.',
    category: 'Supplements'
  },
  { 
    name: 'Lavender Essential Oil', 
    price: 599, 
    image: 'https://picsum.photos/400', 
    description: '100% pure lavender essential oil for relaxation and better sleep.',
    category: 'Essential Oils'
  },
  { 
    name: 'Wellness Kit', 
    price: 2499, 
    image: 'https://picsum.photos/400', 
    description: 'A curated set of our best-selling wellness products.',
    category: 'Bundles'
  },
  { 
    name: 'Rose Petal Face Toner', 
    price: 349, 
    image: 'https://picsum.photos/400', 
    description: 'Refreshing facial toner made from organic rose petals.',
    category: 'Skincare'
  },
  { 
    name: 'Sandalwood Incense Stick', 
    price: 299, 
    image: 'https://picsum.photos/400', 
    description: 'Natural high-quality sandalwood incense for meditation.',
    category: 'Aromatherapy'
  },
  { 
    name: 'Ayurvedic Glow Serum', 
    price: 899, 
    image: 'https://picsum.photos/400', 
    description: 'Ayurvedic face serum that revitalizes skin elasticity and glow.',
    category: 'Skincare'
  },
  { 
    name: 'Ashwagandha Root Powder', 
    price: 450, 
    image: 'https://picsum.photos/400', 
    description: 'Stress relief and adaptogenic root powder supporting nervous system health.',
    category: 'Supplements'
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB via seeding script');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(dummyProducts);
    console.log('Dummy products seeded successfully');
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
