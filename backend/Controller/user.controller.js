import User from '../Models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { senderEmailVerification } from '../utils/email.js'

export const signup = async (req, res) => {
    try {

        const { username, email, password, confirmPassword, location } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match " })
        }

        if (!username || !email || !password || !location) {
            return res.status(400).json({ error: 'Fill all fields' })
        }

        const checkEmail = await User.findOne({ email })

        if (checkEmail) {
            return res.status(400).json({ error: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            username,
            email,
            password: hashedPassword,
            location
        })

        const data = await user.save()

        const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        await senderEmailVerification(email, token)

        return res.status(200).json({ sucess: true, user, token })

    } catch (error) {
        console.error('Error in controller', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Fill all fields" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "user doesn't exit" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({ message: "Incorrect password" })
        }

        if (!user.verified) {
            return res.status(400).json({message: "Not verified"})
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('authorization', token, { httpOnly: false, secure: true, sameSite: "None", path: '/' })

        return res.status(200).json({ success: true, user, token })

    } catch (error) {
        console.error("Error in Login", error);
        res.status(500).json({ error: "Internal serverl error", error })
    }
}

export const logout = async (req, res) => {
    try {

        res.clearCookie('authorization', { httpOnly: false, secure: true, sameSite: "None", })

        return res.status(200).json({ success: true, message: "logged out sucessfully" })

    } catch (error) {
        console.error("Error in logout", error);
        res.status(500).json({ error: "Internal server error", error })
    }
}

export const userDetail = async (req, res) => {
    try {
        const id = req.user.id
        console.log("This is the user ID: ", id);


        const user = await User.findById(id)

        if (!user) {
           return res.status(400).json({ message: "User not found" })
        }

       return  res.status(200).json({ success: true, user })


    } catch (error) {
        console.error("Error in controller", error);
        res.status(500).json({ error: "Internal servre error" })
    }
}

export const editUser = async (req, res) => {
    try {

        const { username, email, location } = req.body

        const user = { username, location }

        const updateUser = await User.findOneAndUpdate({ email }, user, { new: true })

        if (!updateUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ success: "User updated successfully", updateUser })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", error })
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const {token} = req.params


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
    
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        user.verified = true

        await user.save()

        return res.status(200).json({ message: "Verified successfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error })
    }
}