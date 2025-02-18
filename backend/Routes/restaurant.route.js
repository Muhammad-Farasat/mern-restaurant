import express from 'express'
import { restaurantLogin, restaurantRemove, restaurantSignup, displayRestaurant, specificRestaurant } from '../Controller/restaurant.controller.js'

const router = express.Router()

router.post('/api/registerRestaurant', restaurantSignup)
router.post('/api/loginRestaurant', restaurantLogin)
router.post('/api/removeRestaurant', restaurantRemove)
router.get('/api/allRestaurant', displayRestaurant)
router.get('/api/specificRestaurant/:id', specificRestaurant)

export default router