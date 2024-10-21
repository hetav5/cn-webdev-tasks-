// models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.']
    },
    password: { 
        type: String, 
        required: true,
        minlength: [6, 'Password must be at least 6 characters long.']
    },
    phoneNumber: { 
        type: String, 
        required: true,
        match: [/^\d{10}$/, 'Please provide a valid phone number.']
    },
    address: { 
        type: String, 
        required: true,
        trim: true 
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
