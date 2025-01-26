import mongoose from "mongoose";

const Cart = mongoose.model('Cart', {
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    items: [
        {
            foodId: {type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true}
        },
        {
            quantity: {type: Number, required: true, min: 1}
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    }
})

export default Cart