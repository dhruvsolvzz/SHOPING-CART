import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useContext(AuthContext);

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Clear cart when user logs out
      setCart({ cartItems: [] });
    }
  }, [isAuthenticated]);

  // Fetch cart from API
  const fetchCart = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.get('/carts');
      setCart(res.data.cart);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (itemId, quantity = 1) => {
    if (!isAuthenticated) {
      // Handle guest cart or redirect to login
      return { success: false, error: 'Please login to add items to cart' };
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/carts', { item_id: itemId, quantity });
      setCart(res.data.cart);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add item to cart';
      setError(errorMsg);
      console.error('Error adding to cart:', err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.delete(`/carts/${itemId}`);
      setCart(res.data.cart);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to remove item from cart';
      setError(errorMsg);
      console.error('Error removing from cart:', err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Create order from cart
  const checkout = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/orders', {});
      // Clear cart after successful checkout
      setCart({ cartItems: [] });
      return { success: true, order: res.data.order };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Checkout failed';
      setError(errorMsg);
      console.error('Error during checkout:', err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.cartItems.reduce((total, item) => {
      return total + (item.item.price * item.quantity);
    }, 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        removeFromCart,
        checkout,
        getCartTotal,
        getCartItemCount,
        cartItems: cart.cartItems || []
      }}
    >
      {children}
    </CartContext.Provider>
  );
};