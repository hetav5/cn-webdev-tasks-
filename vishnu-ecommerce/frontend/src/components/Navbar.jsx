import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logo from "../assets/icon2.webp";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const auth = localStorage.getItem('user');
  const user = auth ? JSON.parse(auth) : null;
  const isAdmin = user && user.isAdmin;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/signup');
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Vinds Logo" className="logo-image" />
        </Link>
        
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <div className="navbar-dropdown">
              <span>Hello, {user.name}</span>
              <div className="dropdown-content">
                {isAdmin ? (
                  <>
                    <Link to="/addproduct">Add Product</Link>
                    <Link to="/update">Update Product</Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile">Your Profile</Link>
                    <Link to="/orders">Your Orders</Link>
                  </>
                )}
                <button onClick={logout}>Logout</button>
              </div>
            </div>
            {!isAdmin && (
              <>
                <Link to="/products" className="text-white navbar-link">Products</Link>

                <Link to="/cart" className="navbar-cart">
                  🛒 <span className="cart-count">0</span>
                </Link>
              </>
            )}
          </>
        ) : (
          <div className="navbar-auth">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
      <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
        ☰
      </button>
      {showMenu && (
        <div className="mobile-menu">
          {user ? (
            <>
              <Link to="/">Home</Link>
              {isAdmin ? (
                <>
                  <Link to="/addproduct">Add Product</Link>
                  <Link to="/update">Update Product</Link>
                </>
              ) : (
                <>
                  <Link to="/products">Products</Link>
                  <Link to="/cart">Cart</Link>
                  <Link to="/profile">Profile</Link>
                </>
              )}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/">Home</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
