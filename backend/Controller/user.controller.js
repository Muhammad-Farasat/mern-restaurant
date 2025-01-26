import User from '../Models/User.js'
import jwt from 'jsonwebtoken'

export const signup = async(req, res) =>{
    try {
        
        const {username, email, password, confirmPassword} = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({message:"Passwords don't match "})
        }

        if (!username || !email || !password) {
            return res.status(400).json({error: 'Fill all fields'})
        }

        const checkEmail = await User.findOne({email})

        if (checkEmail) {
            return res.status(400).json({error: "User already exists"})
        }

        const user = new User({
            username,
            email,
            password,
        })

        const data = await user.save()

        const token = jwt.sign({id: data._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        res.cookie('authorization', token, {httpOnly: true})

        return res.status(200).json({sucess: true, user, token})

    } catch (error) {
        console.error('Error in controller', error);
        res.status(500).json({error: 'Internal server error'})
    }
}

export const login = async(req, res) =>{
    try {
        
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({message: "Fill all fields"})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: "user doesn't exit"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        res.cookie('authorization', token, {httpOnly: true})

        return res.status(200).json({success: true, user, token})

    } catch (error) {
        console.error("Error in Login", error);
        res.status(500).json({error: "Internal serverl error", error})
    }
}

export const logout = async(req, res) => {
    try {
        
        res.clearCookie('authorization', {httpOnly: true})

        return res.status(200).json({success: true, message: "logged out sucessfully"})

    } catch (error) {
        console.error("Error in logout", error);
        res.status(500).json({error: "Internal server error", error})
    }
}