import mongoose from 'mongoose'

const Restaurant = mongoose.model('Restaurant', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
    },
    image: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    foodItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        }
    ]
})

export default Restaurant