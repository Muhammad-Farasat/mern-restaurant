import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantOrders, updateOrderStatus } from "../../redux/orderSlice";
import { useParams } from "react-router-dom";
import useRestaurant from "../../hooks/restaurant/useRestaurant";

const RestaurantDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { restaurantOrders: orders } = useSelector((state) => state.order);
  const { oneRestaurant, loading: RestaurantLoading } = useRestaurant(id);

  useEffect(() => {
    if (oneRestaurant) {
      dispatch(fetchRestaurantOrders(oneRestaurant._id));
    } else {
      console.log("Cannot fetch orders: oneRestaurant._id is missing.");
    }
  }, [dispatch, oneRestaurant]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  // Loading state
  if (RestaurantLoading) {
    return <p className="text-center text-lg">Loading...</p>;
  }


  // No orders available
  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-500 mt-[20%] ">No orders available.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-[Nunito-ExtraBold] text-[#2A3B4D] mb-8">
        Restaurant Dashboard - {oneRestaurant.name}
      </h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#8AA896]">
            <tr>
              <th className="p-4 text-left text-white">Order ID</th>
              <th className="p-4 text-left text-white">Customer</th>
              <th className="p-4 text-left text-white">Location</th>
              <th className="p-4 text-left text-white">Total</th>
              <th className="p-4 text-left text-white">Status</th>
              <th className="p-4 text-left text-white">Items</th>
              <th className="p-4 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-[#E0E3E6] hover:bg-[#F5F0E6]/50 transition-colors"
              >
                <td className="p-4 text-[#4A4A4A] font-[Nunito-Bold]">
                  #{order._id.slice(-6)}
                </td>
                <td className="p-4 text-[#2A3B4D]">
                  {order.userId?.username || "N/A"}
                </td>
                <td className="p-4 text-[#4A4A4A]">
                  {order.userId?.location || "N/A"}
                </td>
                <td className="p-4 text-[#D87C5A] font-[Nunito-Bold]">
                  Rs. {order.totalPrice}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-[Nunito-Bold] ${
                      order.status === "pending"
                        ? "bg-[#E8B7A3]/30 text-[#D87C5A]"
                        : order.status === "preparing"
                        ? "bg-[#8AA896]/30 text-[#2A3B4D]"
                        : "bg-[#A79B8D]/30 text-[#4A4A4A]"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <details className="group">
                    <summary className="text-[#8AA896] hover:text-[#769382] cursor-pointer">
                      View Items ({order.items?.length || 0})
                    </summary>
                    <div className="mt-2 p-4 bg-[#F5F0E6] rounded-lg">
                      {order.items?.map((item, index) => (
                        console.log(item),
                        
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[#D87C5A]">🍽</span>
                            <span className="text-[#4A4A4A]">
                              {item.foodId?.name || "N/A"}
                            </span>
                          </div>
                          <span className="text-[#2A3B4D] font-[Nunito-Bold]">
                            {item.quantity} x Rs.{item.foodId.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </details>
                </td>
                <td className="p-4">
                  <select
                    className="p-2 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] transition-all"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantDashboard;