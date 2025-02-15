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
    },
    verified:{
        type: Boolean,
        default: false
    }
})

export default User