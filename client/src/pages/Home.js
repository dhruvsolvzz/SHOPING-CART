import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';

const HomeContainer = styled.div`
  padding: 1rem 0;
`;

const Hero = styled.div`
  background-color: #3498db;
  color: white;
  padding: 3rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const Button = styled.button`
  background-color: white;
  color: #3498db;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
    transform: translateY(-2px);
  }
`;

const ProductsSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #3498db;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: #3498db;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AddToCartButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
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

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/items');
        setProducts(res.data.items);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId, 1);
    if (!result.success) {
      alert(result.error);
    }
  };
  
  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>Welcome to our Shopping Cart</HeroTitle>
        <HeroSubtitle>Find the best products at the best prices</HeroSubtitle>
        <Button as={Link} to="/">Shop Now</Button>
      </Hero>
      
      <ProductsSection>
        <SectionTitle>Featured Products</SectionTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ProductGrid>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id}>
                  <ProductImage>
                    <img 
                      src={product.image_url || 'https://via.placeholder.com/300x200?text=Product+Image'} 
                      alt={product.name} 
                    />
                  </ProductImage>
                  <ProductInfo>
                    <ProductName>
                      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {product.name}
                      </Link>
                    </ProductName>
                    <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                    <ProductDescription>{product.description}</ProductDescription>
                    <AddToCartButton onClick={() => handleAddToCart(product.id)}>
                      Add to Cart
                    </AddToCartButton>
                  </ProductInfo>
                </ProductCard>
              ))
            ) : (
              <p>No products available at the moment. Please check back later.</p>
            )}
          </ProductGrid>
        )}
      </ProductsSection>
    </HomeContainer>
  );
};

export default Home;