import express from 'express'
import { restaurantLogin, restaurantRemove, restaurantSignup, displayRestaurant, specificRestaurant, getRestaurantByToken } from '../Controller/restaurant.controller.js'
import {verifyRestaurantToken} from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/api/registerRestaurant', restaurantSignup)
router.post('/api/loginRestaurant', restaurantLogin)
router.post('/api/removeRestaurant', restaurantRemove)
router.get('/api/allRestaurant', displayRestaurant)
router.get('/api/restaurant-by-token', verifyRestaurantToken, getRestaurantByToken)
router.get('/api/specificRestaurant/:id', specificRestaurant)

export default router