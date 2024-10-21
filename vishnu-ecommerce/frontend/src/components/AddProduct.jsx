import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Product name is required.";
        if (!price.trim()) newErrors.price = "Price is required.";
        if (!category.trim()) newErrors.category = "Category is required.";
        if (!quantity.trim()) newErrors.quantity = "Quantity is required.";
        if (!description.trim()) newErrors.description = "Description is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addProductHandler = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:5000/addproduct", {
            method: "POST",
            body: JSON.stringify({ 
                name, 
                price, 
                category, 
                description,
                quantity,
                userId 
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        
        result = await result.json();
        console.warn(result);
        navigate("/products");
    };

    return (
        <div className="add-product-container">
            <h2>Add Product</h2>
            <form onSubmit={addProductHandler}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter Product Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    {errors.name && <p className="error-message active">{errors.name}</p>}
                </div>
                <div>
                    <input 
                        type="number" 
                        placeholder="Enter Product Price" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                    {errors.price && <p className="error-message active">{errors.price}</p>}
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter Product Category" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                    />
                    {errors.category && <p className="error-message active">{errors.category}</p>}
                </div>
                <div>
                    <input 
                        type="number" 
                        placeholder="Enter Product Quantity" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                    />
                    {errors.quantity && <p className="error-message active">{errors.quantity}</p>}
                </div>
                <div>
                    <textarea 
                        placeholder="Enter Product Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                    {errors.description && <p className="error-message active">{errors.description}</p>}
                </div>
                
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
