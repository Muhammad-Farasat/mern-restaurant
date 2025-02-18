import express from 'express'
import { addFood, deleteFood, getFoods, specificFood, updateFood } from '../Controller/food.controller.js'
import { verifyRestaurantToken } from '../Middleware/authenticate.js'


const router = express.Router()

router.post('/api/addFood', verifyRestaurantToken, addFood)
router.post('/api/deleteFood', verifyRestaurantToken, deleteFood)
router.post('/api/updateFood', verifyRestaurantToken, updateFood)
router.get('/api/getFoods', getFoods)
// router.get('/getFood/:id', specificFood)


export default router