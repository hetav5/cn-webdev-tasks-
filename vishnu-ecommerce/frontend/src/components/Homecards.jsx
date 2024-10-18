import React from 'react';
import "./Homecards.css";

const HomeCards = ({ product }) => {
  return (
    <div className="home-card-container">
      <h1 className="text-2xl font-bold text-center mt-4">Product Store</h1>
      <div className="home-card-image">
        <img 
          src={product.img} 
          alt={product.title} 
        />
      </div>
      <h2 className="home-card-title">{product.title}</h2>
      <div className="home-card-rating">
        <span>★★★★☆</span>
        <a href="#ratings">(1,234 ratings)</a>
      </div>
      <div>
        <span className="home-card-price">₹{product.price.toFixed(2)}</span>
        <span className="home-card-old-price">M.R.P: ₹{(product.price * 1.2).toFixed(2)}</span>
        <span className="home-card-discount">Save ₹{(product.price * 0.2).toFixed(2)} (20%)</span>
      </div>
      <p className="home-card-delivery">
        Get it by <span>Tomorrow</span>
      </p>
      <button className="home-card-button">
        Add to Cart
      </button>
    </div>
  );
};

export default HomeCards;
