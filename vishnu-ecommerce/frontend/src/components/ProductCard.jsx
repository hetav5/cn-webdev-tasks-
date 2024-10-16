import React, { useEffect, useState } from 'react';
import './ProductCard.css';

const ProductCard = () => {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const getProduct = async () => {
      try {
        let result = await fetch('http://localhost:5000/product');
        result = await result.json();
        setProduct(result);
        setFilteredProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProduct();
  }, []);

  const handleSearchClick = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      try {
        let result = await fetch(`http://localhost:5000/search/${searchTerm}`);
        result = await result.json();
        setFilteredProducts(result);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    } else {
      setFilteredProducts(product);
    }
  };

  const addToCartHandler = async (productId, index) => {
    try {
        // Retrieve the user from localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // Check if the user exists and has an ID
        if (user && user._id) {
            const userId = user._id;

            const response = await fetch('http://localhost:5000/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, productId }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Product added to cart:', productId);

                // Update the state to reflect the reduced stock
                const updatedProducts = [...filteredProducts];
                updatedProducts[index].quantity -= 1;
                setFilteredProducts(updatedProducts);
            } else {
                alert(result.message);
            }
        } else {
            console.error('User not found. Please log in.');
            alert('User not found. Please log in.');
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
};


  return (
    <div className="product-container">
      <h1>PRODUCTS</h1>
      <div className="search-container">
        <form onSubmit={handleSearchClick} className="search-form">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
          </select>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      <div className="product-card">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <div key={index} className="product-item">
              <h3>{item.name}</h3>
              <div className="rating">★★★★☆</div>
              <p>{item.description}</p>
              <p className="price">₹{item.price}</p>
              <p 
                className={`stock ${item.quantity === 0 ? 'out-of-stock' : ''}`}
              >
                {item.quantity > 0 ? `${item.quantity} in stock` : 'Out of stock'}
              </p>
              <button 
                className="add-to-cart-button" 
                onClick={() => addToCartHandler(item._id, index)}
                disabled={item.quantity === 0}
              >
                Add to Cart
              </button>
              <div className="prime">Prime</div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
