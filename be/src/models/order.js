import mongoose from "mongoose";
import User from './user.js';
import Product from './product.js';

const ProductSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

const Order = mongoose.model(
    'Order',
    new mongoose.Schema({
        products: [ProductSchema],
        totalProducts: {
            type: Number,
        },
        totalPrice: { type: Number },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        state: {
            type: String,
            enum: ['Pending', 'Completed']
        },
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Card']
        },
        customerPay: {
            type: Number,
        },
        refund: {
            type: Number
        },
    },
        { timestamps: true }
    )
)

export default Order;