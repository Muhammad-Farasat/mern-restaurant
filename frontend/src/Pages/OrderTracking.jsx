import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserOrders } from '../Redux/orderSlice'
import Cookies from 'js-cookie'

const OrderTracking = () => {

    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.order)

    const userData = JSON.parse(Cookies.get('user-data'))

    useEffect(() => {
        dispatch(fetchUserOrders(userData._id))
    }, [dispatch])

    return (
        <>
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold text-[#2A3B4D] mb-8">Order History</h2>

                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-[#4A4A4A]">You have no orders yet.</p>
                        <p className="text-[#A79B8D] mt-2">
                            Start exploring restaurants to place your first order!
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[#8AA896]">
                                <tr>
                                    <th className="p-4 text-left text-white">Order ID</th>
                                    <th className="p-4 text-left text-white">Total</th>
                                    <th className="p-4 text-left text-white">Status</th>
                                    <th className="p-4 text-left text-white">Date</th>
                                    <th className="p-4 text-left text-white">Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="border-b border-[#E0E3E6] hover:bg-[#F5F0E6]/50 transition-colors"
                                    >
                                        <td className="p-4 text-[#4A4A4A]">
                                            <span className="font-medium">#{order._id.slice(-6)}</span>
                                        </td>
                                        <td className="p-4 text-[#D87C5A] font-semibold">
                                            Rs. {order.totalPrice}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "pending"
                                                    ? "bg-[#E8B7A3]/30 text-[#D87C5A]"
                                                    : order.status === "preparing"
                                                        ? "bg-[#8AA896]/30 text-[#2A3B4D]"
                                                        : "bg-[#A79B8D]/30 text-[#4A4A4A]"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-[#4A4A4A]">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <details className="group">
                                                <summary className="text-[#8AA896] hover:text-[#769382] cursor-pointer">
                                                    View Items ({order.items.length})
                                                </summary>
                                                <div className="mt-2 p-4 bg-[#F5F0E6] rounded-lg">
                                                    {order.items.map((item, index) => (
                                                        <div key={index} className="flex justify-between items-center py-2">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[#D87C5A]">🍽</span>
                                                                <span className="text-[#4A4A4A]">{item.foodId.name}</span>
                                                            </div>
                                                            <span className="text-[#2A3B4D] font-medium">
                                                                {item.quantity} x Rs.{item.foodId.price}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </details>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default OrderTracking