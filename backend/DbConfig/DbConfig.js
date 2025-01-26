import mongoose from 'mongoose'

const db = async() =>{
    mongoose.connect(process.env.MONGO_DB_URL)
    
    mongoose.connection.on('connected', () => {
        console.log("Mongo DB connected");
    })
    
    mongoose.connection.on('error', (err)=>{
        console.log("Error in Mongo DB", err);
    })
}

export default db