import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';

const ProductDetailContainer = styled.div`
  padding: 1rem 0;
`;

const Breadcrumbs = styled.div`
  margin-bottom: 2rem;
  color: #7f8c8d;
  
  a {
    color: #3498db;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  span {
    margin: 0 0.5rem;
  }
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 1.5rem;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const QuantityButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
`;

const AddToCartButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 1rem;
  
  &:hover {
    background-color: #2980b9;
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
`;

const BackButton = styled(Link)`
  background-color: #e0e0e0;
  color: #333;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  
  &:hover {
    background-color: #d0d0d0;
    transform: translateY(-2px);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  
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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  
  const { addToCart } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/items/${id}`);
        setProduct(res.data.item);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = async () => {
    setAddingToCart(true);
    
    try {
      const result = await addToCart(id, quantity);
      if (!result.success) {
        alert(result.error);
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setAddingToCart(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  
  if (!product) {
    return <ErrorMessage>Product not found</ErrorMessage>;
  }
  
  return (
    <ProductDetailContainer>
      <Breadcrumbs>
        <Link to="/">Home</Link> <span>›</span> {product.name}
      </Breadcrumbs>
      
      <ProductContent>
        <ProductImageContainer>
          <img 
            src={product.image_url || 'https://via.placeholder.com/600x400?text=Product+Image'} 
            alt={product.name} 
          />
        </ProductImageContainer>
        
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
          
          <QuantitySelector>
            <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
            <QuantityInput 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={handleQuantityChange} 
            />
            <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
          </QuantitySelector>
          
          <ButtonGroup>
            <AddToCartButton 
              onClick={handleAddToCart} 
              disabled={addingToCart}
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </AddToCartButton>
            <BackButton to="/">Back to Products</BackButton>
          </ButtonGroup>
        </ProductInfo>
      </ProductContent>
    </ProductDetailContainer>
  );
};

export default ProductDetail;