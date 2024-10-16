import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Ensure you import the CSS file for styling

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
                    setCartItems(response.data.items); // Assuming the response has an 'items' array
                    calculateTotalPrice(response.data.items); // Calculate total price on fetch
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCart();
    }, [user]);

    // Function to calculate the total price
    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => {
            return acc + (item.productId.price * item.quantity);
        }, 0);
        setTotalPrice(total);
    };

    // Function to handle removal of an item from the cart
    const removeFromCart = async (productId, quantity) => {
        if (user) {
            try {
                // Call API to remove the item from the cart
                await axios.post('http://localhost:5000/remove-from-cart', {
                    userId: user._id,
                    productId,
                });

                // Update cartItems based on quantity
                const updatedItems = cartItems.reduce((acc, item) => {
                    if (item.productId._id === productId) {
                        if (quantity > 1) {
                            return [...acc, { ...item, quantity: item.quantity - 1 }];
                        } else {
                            return acc; // Skip adding this item
                        }
                    }
                    return [...acc, item]; // Keep other items
                }, []);

                setCartItems(updatedItems);
                calculateTotalPrice(updatedItems);
            } catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    };

    // Function to create a bill
    const createBill = () => {
        const billContent = cartItems.map(item => ({
            name: item.productId.name,
            quantity: item.quantity,
            price: item.productId.price,
            total: item.productId.price * item.quantity,
        }));

        // You can format this content into a bill format or display it in an alert, etc.
        const bill = `
            Bill Summary:
            ${billContent.map(item => `${item.name} (x${item.quantity}): ₹${item.total}`).join('\n')}
            -------------------------
            Total Price: ₹${totalPrice}
        `;

        // Display the bill in an alert or console (you can also implement printing or PDF generation)
        alert(bill);
    };

    if (loading) {
        return <div className="loading"></div>; // Show loading spinner
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
