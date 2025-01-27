import mongoose from "mongoose";


const User = mongoose.model('User',{
    username: {
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
    location: {
        type: String,
    }
})

export default User