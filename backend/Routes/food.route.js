import express from 'express'
import { addFood, deleteFood, getFoods, specificFood, updateFood } from '../Controller/food.controller.js'
import { verifyRestaurantToken } from '../Middleware/authenticate.js'


const router = express.Router()

router.post('/addFood', verifyRestaurantToken, addFood)
router.post('/deleteFood', verifyRestaurantToken, deleteFood)
router.post('/updateFood', verifyRestaurantToken, updateFood)
router.get('/getFoods', verifyRestaurantToken, getFoods)
router.get('/getFood/:id', specificFood)


export default router