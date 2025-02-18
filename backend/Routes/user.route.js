import express from 'express'
import {signup, login, logout, userDetail, editUser, verifyEmail} from '../Controller/user.controller.js'
import {verifyCustomerToken} from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/api/login',  login)
router.post('/api/signup', signup)
router.post('/api/logout', logout)
router.get('/api/user-details', verifyCustomerToken, userDetail)
router.get('/api/verify-email/:token', verifyEmail)
router.post('/api/edit-profile', editUser)

export default router