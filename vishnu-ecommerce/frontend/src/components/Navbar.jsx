import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logo from "../assets/icon1.png";

function Navbar() {
  const auth = localStorage.getItem('user');
  const user = auth ? JSON.parse(auth) : null;
  const isAdmin = user && user.isAdmin; // Check if the user is an admin
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/signup');
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Vinds Logo" className="logo-image" />
      </Link>
      <ul className="navbar-list">
        {user ? 
          <>
            <li><Link to="/">Home</Link></li>
            {isAdmin ? (
              <>
                <li><Link to="/addproduct">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </>
            )}
            <li><button onClick={logout}>Logout</button></li>
          </>
        : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
