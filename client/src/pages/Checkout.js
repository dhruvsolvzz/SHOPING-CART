import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const CheckoutContainer = styled.div`
  padding: 1rem 0;
`;

const CheckoutHeader = styled.div`
  margin-bottom: 2rem;
`;

const CheckoutTitle = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
`;

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled.form`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr 1fr'};
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const OrderSummary = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
`;

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  
  &:last-of-type {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
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
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
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

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const Checkout = () => {
  const { cart, getCartTotal, checkout } = useContext(CartContext);
  const { isAuthenticated, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'credit'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Redirect if not authenticated or cart is empty
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!cart.cartItems || cart.cartItems.length === 0) {
      navigate('/');
      return;
    }
    
    // Pre-fill form with user data if available
    if (currentUser) {
      setFormData(prevState => ({
        ...prevState,
        email: currentUser.email || ''
      }));
    }
  }, [isAuthenticated, cart, navigate, currentUser]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await checkout();
      
      if (result.success) {
        // Show success message and redirect to orders page
        alert('Order successful.');
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred during checkout. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  if (!isAuthenticated || !cart.cartItems || cart.cartItems.length === 0) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <CheckoutTitle>Checkout</CheckoutTitle>
      </CheckoutHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <CheckoutContent>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Contact Information</SectionTitle>
            <FormRow>
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Shipping Address</SectionTitle>
            <FormGroup>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="state">State</Label>
                <Input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="country">Country</Label>
                <Select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </Select>
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Payment Method</SectionTitle>
            <FormGroup>
              <Label htmlFor="paymentMethod">Select Payment Method</Label>
              <Select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
              </Select>
            </FormGroup>
          </FormSection>
          
          <ButtonGroup>
            <Button type="button" secondary as={Link} to="/cart">
              Back to Cart
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </ButtonGroup>
        </CheckoutForm>
        
        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          {cart.cartItems && cart.cartItems.map((item) => (
            <SummaryItem key={item.item_id}>
              <span>{item.item.name} (x{item.quantity})</span>
              <span>${(item.item.price * item.quantity).toFixed(2)}</span>
            </SummaryItem>
          ))}
          
          <SummaryItem>
            <span>Shipping</span>
            <span>Free</span>
          </SummaryItem>
          
          <SummaryTotal>
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </SummaryTotal>
          
          <Button 
            fullWidth 
            type="button" 
            onClick={() => document.querySelector('form').requestSubmit()}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </Button>
        </OrderSummary>
      </CheckoutContent>
    </CheckoutContainer>
  );
};

export default Checkout;