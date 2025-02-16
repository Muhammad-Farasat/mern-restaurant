import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from '../../redux/orderSlice';

const CheckOut = ({ isOpen, onclose }) => {
  
  let userData = JSON.parse(Cookies.get('user-data'))

  const [userInfo, setUserInfo] = useState({
    name: userData.username,
    address: userData.location
  })

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = cart.reduce((acc, item) => acc + item.foodId.price * item.quantity, 0);

  const handlePlaceOrder = () => {

      const orderData = {
        userId: userData._id,
        restaurantId: cart[0]?.foodId.restaurantId,
        items: cart,
        totalPrice,
        status: "pending",
        userInfo,
      }

      dispatch(placeOrder(orderData))      

      onclose() 

  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-[#2A3B4D]/90 p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-[#E0E3E6]">
            <h2 className="text-2xl font-[Nunito-ExtraBold] text-[#2A3B4D]">Confirm Your Order</h2>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                placeholder="Enter your address"
              />
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-[Nunito-Bold] text-[#2A3B4D] mb-3">
                Order Summary
              </h3>
              <ul className="divide-y divide-[#E0E3E6]">
                {cart.map((item) => (
                  <li key={item.foodId._id} className="flex justify-between items-center py-2.5">
                    <span className="text-[#4A4A4A]">
                      {item.foodId.name} (x{item.quantity})
                    </span>
                    <span className="text-[#D87C5A] font-[Nunito-Bold]">
                      Rs.{item.foodId.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total Price */}
            <div className="pt-4 border-t border-[#E0E3E6]">
              <p className="text-xl font-[Nunito-ExtraBold] text-[#2A3B4D]">
                Total: Rs. {totalPrice}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#E0E3E6] flex justify-end gap-3">
            <button
              onClick={onclose}
              className="px-6 py-2.5 text-[#2A3B4D] bg-[#E0E3E6] rounded-lg font-[Nunito-Bold] hover:bg-[#D87C5A] hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-2.5 text-white bg-[#8AA896] rounded-lg font-[Nunito-Bold] hover:bg-[#769382] transition-all transform hover:scale-105 active:scale-95"
            >
              Confirm & Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckOut