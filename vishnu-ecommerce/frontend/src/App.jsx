import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Signup from './components/signup.jsx'; 
import PrivateComponents from "./components/Privatecomponents.jsx"; 
import Login from './components/login.jsx';
import Profile from './components/profile.jsx';
import AddProduct from './components/AddProduct.jsx';
import Cart from './components/Cart.jsx';
import ProductCard from './components/ProductCard.jsx';
import Home from './components/Home'; 

function UpdateProduct() {
    return <div>Update Product</div>;
}

function Logout() {
    return <div>Logout</div>;
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route element={<PrivateComponents />}>
                        <Route path="/" element={<Home/>} />
                        <Route path="/addproduct" element={<AddProduct />} />
                        <Route path="/update" element={<UpdateProduct />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/products" element={<ProductCard />} />
                    </Route>
                    <Route path="/signup" element={<Signup />} /> 
                    <Route path="/login" element={<Login />} /> 
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
