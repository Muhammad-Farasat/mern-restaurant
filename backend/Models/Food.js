import mongoose from "mongoose";

const Food = mongoose.model('Food', {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true
    }
})

export default Food