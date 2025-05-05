import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import MerchCatalog from './MerchCatalog';

export default function InPersonCheckout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [nextPath, setNextPath] = useState(null);
  const [lastPathname, setLastPathname] = useState(location.pathname);

  // Block browser reload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Detect route change
  useEffect(() => {
    if (
      lastPathname === "/checkout/pickup" &&
      location.pathname !== "/checkout/pickup" &&
      !confirmLeave
    ) {
      setNextPath(location.pathname);
      setConfirmLeave(true);
    } else {
      setLastPathname(location.pathname);
    }
  }, [location, confirmLeave, lastPathname]);

  const proceed = () => {
    setConfirmLeave(false);
    navigate(nextPath);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-6xl mx-auto pt-28 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-4 text-center">
          In-Person Checkout
        </h1>
        <p className="text-lg text-purple-300 text-center mb-12">
          Scan to pay. No shipping will be collected.
        </p>

        <MerchCatalog inPersonMode={true} />
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
