import express from 'express'
import {signup, login, logout, userDetail, editUser} from '../Controller/user.controller.js'
import {verifyCustomerToken} from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/login',  login)
router.post('/signup', signup)
router.post('/logout', logout)
router.get('/user-details', verifyCustomerToken, userDetail)
router.post('/edit-profile', editUser)

export default router