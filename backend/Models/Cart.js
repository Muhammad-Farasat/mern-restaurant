import mongoose from "mongoose";

const Cart = mongoose.model('Cart', {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    }
})

export default Cart