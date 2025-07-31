import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const CartContainer = styled.div`
  padding: 1rem 0;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
`;

const CartEmpty = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const CartEmptyText = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
`;

const CartItems = styled.div`
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const ItemPrice = styled.p`
  font-weight: bold;
  color: #3498db;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
`;

const QuantityText = styled.span`
  margin: 0 0.5rem;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const CartSummary = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? '#e0e0e0' : '#3498db'};
  color: ${props => props.secondary ? '#333' : 'white'};
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: ${props => props.secondary ? '1rem' : '0'};
  
  &:hover {
    background-color: ${props => props.secondary ? '#d0d0d0' : '#2980b9'};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  &:after {
    content: '';
    width: 40px;
    height: 40px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const Cart = () => {
  const { cart, loading, error, removeFromCart, checkout, getCartTotal, fetchCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);
  
  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };
  
  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    
    try {
      const result = await checkout();
      if (result.success) {
        // Show success message
        alert('Order successful.');
        navigate('/');
      } else {
        setCheckoutError(result.error);
      }
    } catch (err) {
      setCheckoutError('An unexpected error occurred during checkout. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };
  
  const handleShowCart = () => {
    // Display cart items in an alert
    if (cart.cartItems && cart.cartItems.length > 0) {
      const cartItemsText = cart.cartItems.map(item => 
        `Item ID: ${item.item_id}, Quantity: ${item.quantity}`
      ).join('\n');
      
      alert(`Cart Items:\n${cartItemsText}`);
    } else {
      alert('Your cart is empty.');
    }
  };
  
  const handleShowOrders = () => {
    // Display order history in an alert
    alert('Order History: No orders placed yet.');
  };
  
  if (!isAuthenticated) {
    return (
      <CartContainer>
        <CartHeader>
          <CartTitle>Your Cart</CartTitle>
        </CartHeader>
        <CartEmpty>
          <CartEmptyText>Please log in to view your cart</CartEmptyText>
          <Button as={Link} to="/login">Login</Button>
        </CartEmpty>
      </CartContainer>
    );
  }
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <CartContainer>
      <CartHeader>
        <CartTitle>Your Cart</CartTitle>
        <ButtonGroup>
          <Button secondary onClick={handleShowCart}>Cart</Button>
          <Button secondary onClick={handleShowOrders}>Order History</Button>
        </ButtonGroup>
      </CartHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {checkoutError && <ErrorMessage>{checkoutError}</ErrorMessage>}
      
      {cart.cartItems && cart.cartItems.length > 0 ? (
        <>
          <CartItems>
            {cart.cartItems.map((cartItem) => (
              <CartItem key={cartItem.item_id}>
                <ItemImage>
                  <img 
                    src={cartItem.item.image_url || 'https://via.placeholder.com/80x80?text=Product'} 
                    alt={cartItem.item.name} 
                  />
                </ItemImage>
                <ItemInfo>
                  <ItemName>{cartItem.item.name}</ItemName>
                  <ItemPrice>${(cartItem.item.price * cartItem.quantity).toFixed(2)}</ItemPrice>
                </ItemInfo>
                <ItemQuantity>
                  <QuantityText>Qty: {cartItem.quantity}</QuantityText>
                </ItemQuantity>
                <RemoveButton onClick={() => handleRemoveItem(cartItem.item_id)}>
                  Remove
                </RemoveButton>
              </CartItem>
            ))}
          </CartItems>
          
          <CartSummary>
            <SummaryRow>
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping:</span>
              <span>Free</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </SummaryRow>
          </CartSummary>
          
          <ButtonGroup>
            <Button secondary as={Link} to="/">
              Continue Shopping
            </Button>
            <Button 
              onClick={handleCheckout} 
              disabled={checkoutLoading || cart.cartItems.length === 0}
            >
              {checkoutLoading ? 'Processing...' : 'Checkout'}
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <CartEmpty>
          <CartEmptyText>Your cart is empty</CartEmptyText>
          <Button as={Link} to="/">Start Shopping</Button>
        </CartEmpty>
      )}
    </CartContainer>
  );
};

export default Cart;