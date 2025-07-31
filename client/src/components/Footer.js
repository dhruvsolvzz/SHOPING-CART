import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #3498db;
`;

const FooterLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3498db;
  }
`;

const FooterText = styled.p`
  color: #bdc3c7;
  line-height: 1.6;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #34495e;
  color: #bdc3c7;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Shopping Cart</FooterTitle>
          <FooterText>
            Your one-stop shop for all your needs. Browse our collection of products and enjoy a seamless shopping experience.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Shop</FooterTitle>
          <FooterLink to="/">All Products</FooterLink>
          <FooterLink to="/">Featured</FooterLink>
          <FooterLink to="/">New Arrivals</FooterLink>
          <FooterLink to="/">Special Offers</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Account</FooterTitle>
          <FooterLink to="/login">Login</FooterLink>
          <FooterLink to="/register">Register</FooterLink>
          <FooterLink to="/cart">View Cart</FooterLink>
          <FooterLink to="/orders">Track Orders</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterText>
            123 Shopping Street<br />
            GB NAGAR, NOIDA 201310<br />
            Email: support@shoppingcart.com<br />
            Phone: +91 9656754328
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {currentYear} Shopping Cart. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;