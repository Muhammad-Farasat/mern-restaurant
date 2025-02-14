import express from 'express'
import { addToCart, removeCartItem, getCart, clearCart} from '../Controller/cart.controller.js'

const router = express.Router()

router.post('/cart/add', addToCart)
router.post('/cart/remove', removeCartItem)
router.post('/cart/clear', clearCart)
router.get('/cart/:userId', getCart)


export default router