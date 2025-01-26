import express from 'express'
import { restaurantLogin, restaurantRemove, restaurantSignup } from '../Controller/restaurant.controller.js'

const router = express.Router()

router.post('/registerRestaurant', restaurantSignup)
router.post('/loginRestaurant', restaurantLogin)
router.post('/removeRestaurant', restaurantRemove)

export default router