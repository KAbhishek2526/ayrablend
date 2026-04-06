import React from 'react';

export default function Footer() {
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
