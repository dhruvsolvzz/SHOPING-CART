import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const NavContainer = styled.nav`
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #ecf0f1;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3498db;
  }
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#3498db' : 'transparent'};
  color: white;
  border: ${props => props.primary ? 'none' : '1px solid white'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const CartBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useContext(AuthContext);
  const { getCartItemCount } = useContext(CartContext);
  const navigate = useNavigate();
  
  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <NavContainer>
      <Logo to="/">
        <span>Shopping Cart</span>
      </Logo>
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        
        {isAuthenticated ? (
          <>
            <NavLink to="/cart">
              Cart {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
            </NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <Button primary onClick={() => navigate('/register')}>Sign Up</Button>
          </>
        )}
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;