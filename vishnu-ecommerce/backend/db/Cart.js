const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
        unique: true // Ensure each user has only one cart
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product model
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1 // Ensure at least one item is added
            }
        }
    ],
    totalPrice: { // Optional field for total price of cart items
        type: Number,
        default: 0
    }
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
