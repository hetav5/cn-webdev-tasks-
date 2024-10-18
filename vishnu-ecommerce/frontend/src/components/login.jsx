import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]); 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                let result = await response.json();
                console.warn(result);
                localStorage.setItem("user", JSON.stringify(result));
                navigate('/'); 
            } else {
                let errorResult = await response.json();
                console.error("Login failed:", errorResult.error);
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {   
            console.error("Error occurred:", error);
            alert("An error occurred while logging in. Please try again.");
        }
    }

    return (
        <div className="login-outer-container">
            <div className="login-container">
                <h3>LOGIN</h3>
                <form onSubmit={handleLogin}>
                    <div className="credentials">
                        <label htmlFor="email">Email:</label>
                        <input 
                            id="email"
                            type="email" 
                            placeholder="Enter Email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <label htmlFor="password">Password:</label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder="Enter Password" 
                            name="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        /> 
                    </div>
                    <button type="submit">Login</button> 
                </form>
            </div>
        </div>
    );
}

export default Login;
