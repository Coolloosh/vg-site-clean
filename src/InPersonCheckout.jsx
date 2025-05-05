// src/pages/InPersonCheckout.jsx
import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHero from './PageHero';

const merchItems = [
  { id: "SkullShirt", name: "VG Skull Tee", price: 2000, image: "/SkullShirt.webp", badge: "New" },
  { id: "OGShirt", name: "OG Tee", price: 2000, image: "/OGShirt.webp", badge: "Hot" },
  { id: "stickerpack", name: "Sticker Pack", price: 1000, image: "/stickerpack.webp" },
  { id: "poster", name: "Show Poster Medley", price: 500, image: "/posters.webp", badge: "Limited" },
];

export default function InPersonCheckout() {
  const { cart, addToCart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [feedbackId, setFeedbackId] = useState(null);
  const [quantities, setQuantities] = useState({});

  // Clear cart if navigating away from this page (not including Stripe checkout)
  useEffect(() => {
    const unlisten = navigate((location) => {
      const path = location.pathname;
      const isLeaving = path !== '/checkout/pickup' && !path.startsWith('/checkout');
      if (isLeaving) clearCart();
    });
    return () => {
      if (typeof unlisten === 'function') unlisten();
    };
  }, [navigate, clearCart]);

  const handleAdd = (item) => {
    const qty = parseInt(quantities[item.id] || 1, 10);
    if (!isNaN(qty) && qty > 0) {
      for (let i = 0; i < qty; i++) {
        addToCart({ name: item.name, price: item.price, image: item.image });
      }
      setFeedbackId(item.id);
      setTimeout(() => setFeedbackId(null), 1500);
    }
  };

  const handleQuantityChange = (e, id) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantities((prev) => ({ ...prev, [id]: value }));
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <PageHero
        image="/merch6.webp"
        title="In-Person Checkout"
        subtitle="Scan to pay. No shipping will be collected."
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        imageClass="object-[55%_top] sm:object-top brightness-50 scale-85"
      />

      <div className="-mt-24 relative z-20 px-6 pt-20 pb-24">
        <h1 className="text-4xl font-bold text-purple-400 mb-12 text-center">Available Merch</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {merchItems.map((item) => {
            return (
              <div
                key={item.id}
                className="group transform transition-transform hover:scale-[1.03] bg-gray-900 rounded-xl border border-purple-700 shadow-md"
              >
                <div className="relative h-72 w-full overflow-hidden rounded-t-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-purple-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                  <p className="text-green-400 font-semibold text-sm mt-1">
                    ${(item.price / 100).toFixed(2)}
                  </p>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={quantities[item.id] || '1'}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                    className="mt-2 text-center w-20 px-2 py-1 bg-gray-800 border border-purple-600 rounded text-white"
                  />
                  <button
                    onClick={() => handleAdd(item)}
                    className={`mt-4 py-2 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
                      feedbackId === item.id
                        ? 'bg-green-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    {feedbackId === item.id ? '✓ Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
