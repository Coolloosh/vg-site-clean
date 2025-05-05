// src/pages/InPersonCheckout.jsx
import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useLocation, useNavigate } from 'react-router-dom';

const merchItems = [
  { id: "SkullShirt", name: "VG Skull Tee", price: 2000, image: "/SkullShirt.webp", badge: "New" },
  { id: "OGShirt", name: "OG Tee", price: 2000, image: "/OGShirt.webp", badge: "Hot" },
  { id: "stickerpack", name: "Sticker Pack", price: 1000, image: "/stickerpack.webp" },
  { id: "poster", name: "Show Poster Medley", price: 500, image: "/posters.webp", badge: "Limited" },
];

export default function InPersonCheckout() {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [nextPath, setNextPath] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    const unlisten = navigate.listen?.((locationUpdate) => {
      if (location.pathname === "/checkout/pickup" && locationUpdate.location.pathname !== "/checkout/pickup") {
        setNextPath(locationUpdate.location.pathname);
        setConfirmLeave(true);
      }
    });
    return () => { if (unlisten) unlisten(); };
  }, [location, navigate]);

  const proceed = () => {
    setConfirmLeave(false);
    navigate(nextPath);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <section className="relative h-[90vh] w-full">
        <img
          src="/merch6.webp"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover brightness-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-0" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-200 drop-shadow-[0_0_40px_rgba(192,132,252,0.6)] mb-4 uppercase tracking-wide">
            In-Person Checkout
          </h1>
          <p className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] opacity-90">
            Scan to pay. No shipping will be collected.
          </p>
        </div>
      </section>

      <div className="-mt-24 relative z-20 px-6 pt-20 pb-24">
        <h1 className="text-4xl font-bold text-purple-400 mb-12 text-center">Available Merch</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {merchItems.map((item) => (
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
                <button
                  onClick={() => addToCart({ name: item.name, price: item.price, image: item.image })}
                  className="mt-4 bg-purple-600 hover:bg-purple-500 text-white py-2 px-6 rounded-full font-bold text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmLeave && (
        <div className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center">
          <div className="bg-gray-900 border border-purple-600 rounded-lg p-8 max-w-sm text-center shadow-lg">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Cancel Checkout?</h2>
            <p className="mb-6 text-sm text-purple-100">
              Navigating away will cancel your in-person transaction. Are you sure?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmLeave(false)}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded"
              >
                Go Back
              </button>
              <button
                onClick={proceed}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
              >
                Leave Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
