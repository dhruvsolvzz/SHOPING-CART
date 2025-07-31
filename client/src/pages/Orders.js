import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const OrdersContainer = styled.div`
  padding: 1rem 0;
`;

const OrdersHeader = styled.div`
  margin-bottom: 2rem;
`;

const OrdersTitle = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
`;

const OrdersEmpty = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const OrdersEmptyText = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const OrderHeader = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderId = styled.span`
  font-weight: bold;
  color: #3498db;
`;

const OrderDate = styled.span`
  color: #7f8c8d;
`;

const OrderItems = styled.div`
  padding: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 50px;
  height: 50px;
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

const ItemName = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #2c3e50;
`;

const ItemPrice = styled.p`
  font-weight: bold;
  color: #3498db;
  font-size: 0.9rem;
`;

const ItemQuantity = styled.span`
  color: #7f8c8d;
  margin-left: 1rem;
`;

const OrderFooter = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderTotal = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
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
  
  &:hover {
    background-color: ${props => props.secondary ? '#d0d0d0' : '#2980b9'};
    transform: translateY(-2px);
  }
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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await api.get('/api/orders');
        setOrders(res.data.orders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
        console.error('Error fetching orders:', err);
      }
    };
    
    fetchOrders();
  }, [isAuthenticated, token]);
  
  if (!isAuthenticated) {
    return (
      <OrdersContainer>
        <OrdersHeader>
          <OrdersTitle>Your Orders</OrdersTitle>
        </OrdersHeader>
        <OrdersEmpty>
          <OrdersEmptyText>Please log in to view your orders</OrdersEmptyText>
          <Button as={Link} to="/login">Login</Button>
        </OrdersEmpty>
      </OrdersContainer>
    );
  }
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <OrdersContainer>
      <OrdersHeader>
        <OrdersTitle>Your Orders</OrdersTitle>
      </OrdersHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {orders.length > 0 ? (
        <OrdersList>
          {orders.map((order) => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <div>
                  <span>Order </span>
                  <OrderId>#{order.id}</OrderId>
                </div>
                <OrderDate>
                  {new Date(order.created_at).toLocaleDateString()}
                </OrderDate>
              </OrderHeader>
              
              <OrderItems>
                {order.cart_items && order.cart_items.map((item) => (
                  <OrderItem key={item.id}>
                    <ItemImage>
                      <img 
                        src={item.item.image_url || 'https://via.placeholder.com/50x50?text=Product'} 
                        alt={item.item.name} 
                      />
                    </ItemImage>
                    <ItemInfo>
                      <ItemName>{item.item.name}</ItemName>
                      <ItemPrice>${item.item.price.toFixed(2)}</ItemPrice>
                    </ItemInfo>
                    <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                  </OrderItem>
                ))}
              </OrderItems>
              
              <OrderFooter>
                <span>Total:</span>
                <OrderTotal>
                  ${order.cart_items.reduce((total, item) => {
                    return total + (item.item.price * item.quantity);
                  }, 0).toFixed(2)}
                </OrderTotal>
              </OrderFooter>
            </OrderCard>
          ))}
        </OrdersList>
      ) : (
        <OrdersEmpty>
          <OrdersEmptyText>You haven't placed any orders yet</OrdersEmptyText>
          <Button as={Link} to="/">Start Shopping</Button>
        </OrdersEmpty>
      )}
    </OrdersContainer>
  );
};

export default Orders;