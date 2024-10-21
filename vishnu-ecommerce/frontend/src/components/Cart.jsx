import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Cart.css'; 
import logo from "../assets/icon2.webp";


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const auth = localStorage.getItem('user');
    const user = auth ? JSON.parse(auth) : null;

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:5000/cart/${user._id}`);
                    setCartItems(response.data.items);
                    calculateTotalPrice(response.data.items);
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCart();
    }, [user]);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => {
            return acc + (item.productId.price * item.quantity);
        }, 0);
        setTotalPrice(total);
    };
    const removeFromCart = async (productId, quantity) => {
        if (user) {
            try {
                await axios.post('http://localhost:5000/remove-from-cart', {
                    userId: user._id,
                    productId,
                });

                const updatedItems = cartItems.reduce((acc, item) => {
                    if (item.productId._id === productId) {
                        if (quantity > 1) {
                            return [...acc, { ...item, quantity: item.quantity - 1 }];
                        } else {
                            return acc;
                        }
                    }
                    return [...acc, item]; 
                }, []);

                setCartItems(updatedItems);
                calculateTotalPrice(updatedItems);
            } catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    };

    const createBill = () => {
        const doc = new jsPDF();

        const img = new Image();
        img.src = logo;

        img.onload = () => {
            doc.addImage(img, 'PNG', 10, 10, 50, 30); 
            doc.setFontSize(12);
            
            doc.text(`Customer: ${user.name}`, 10, 50);
            doc.text(`Phone: ${user.phone}`, 10, 60);
            doc.text(`Address: ${user.address}`, 10, 70);

            doc.setFontSize(18);
            doc.text('Bill Summary', 10, 90);

            const billContent = cartItems.map(item => [
                item.productId.name,
                item.quantity,
                item.productId.price,
                item.productId.price * item.quantity
            ]);

            doc.autoTable({
                startY: 100,
                head: [['Product Name', 'Quantity', 'Price (₹)', 'Total (₹)']],
                body: billContent,
            });

            doc.setFontSize(16);
            doc.text(`Total Price: ₹ ${totalPrice}`, 10, doc.autoTable.previous.finalY + 20);

            doc.save('bill.pdf');
        };
    };

    if (loading) {
        return <div className="loading"></div>; 
    }

    return (
        <div className="cart-container">
            <div className="header">
                <h2>Your Cart</h2>
                <button className="create-bill-button" onClick={createBill}>Create Bill</button>
            </div>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="product-card">
                    {cartItems.map((item) => (
                        <div key={item.productId._id} className="product-item">
                            <h3>{item.productId.name}</h3>
                            <div className="rating">★★★★☆</div>
                            <p>{item.productId.description}</p>
                            <p className="price">₹{item.productId.price}</p>
                            <p className={`stock ${item.quantity === 0 ? 'out-of-stock' : ''}`}>
                                {item.quantity > 0 ? `${item.quantity} in stock` : 'Out of stock'}
                            </p>
                            <button onClick={() => removeFromCart(item.productId._id, item.quantity)}>
                                {item.quantity > 1 ? 'Remove One' : 'Remove from Cart'}
                            </button>
                        </div>
                    ))}
                    <div className="total-price">
                        <h3>Total Price: ₹{totalPrice}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
