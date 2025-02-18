import express from 'express'
import { addToCart, removeCartItem, getCart, clearCart} from '../Controller/cart.controller.js'

const router = express.Router()

router.post('/api/cart/add', addToCart)
router.post('/api/cart/remove', removeCartItem)
router.post('/api/cart/clear', clearCart)
router.get('/api/cart/:userId', getCart)


export default router