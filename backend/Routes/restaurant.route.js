import express from 'express'
import { restaurantLogin, restaurantRemove, restaurantSignup, displayRestaurant, specificRestaurant } from '../Controller/restaurant.controller.js'

const router = express.Router()

router.post('/registerRestaurant', restaurantSignup)
router.post('/loginRestaurant', restaurantLogin)
router.post('/removeRestaurant', restaurantRemove)
router.get('/allRestaurant', displayRestaurant)
router.get('/specificRestaurant/:id', specificRestaurant)

export default router