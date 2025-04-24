import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const uid = uuidv4();
    setCart((prev) => [...prev, { ...product, uid, quantity: 1 }]);
  };

  const updateCartItem = (uid, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.uid === uid ? { ...item, quantity } : item)).filter((item) => item.quantity > 0)
    );
  };

  const updateCartSize = (uid, newSize) => {
    setCart((prev) => prev.map((item) => (item.uid === uid ? { ...item, size: newSize } : item)));
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, updateCartSize, getTotal, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
