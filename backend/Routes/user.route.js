import express from 'express'
import {signup, login, logout} from '../Controller/user.controller.js'

const router = express.Router()

router.post('/login',  login)
router.post('/signup', signup)
router.post('/logout', logout)
// router.post('/userSpecific', userSpecific)

export default router