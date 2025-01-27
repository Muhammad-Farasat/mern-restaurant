import express from 'express'
import {signup, login, logout, userSpecific} from '../Controller/user.controller.js'

const router = express.Router()

router.post('/login',  login)
router.post('/signup', signup)
router.post('/logout', logout)
router.post('/userSpecific/:id', userSpecific)

export default router