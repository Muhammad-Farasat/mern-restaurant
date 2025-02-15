import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  clearCartState,
  clearCart,
} from "../../Redux/cartSlice";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import CheckOut from "../CheckOut/CheckOut";

const Cart = () => {
  
  let { id } = useParams();

  const [isCheckedOpen, setIsCheckedOpen] = useState(false)

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const fetchCookies = JSON.parse(Cookies.get("user-data"));
  const userId = fetchCookies._id;

  useEffect(() => {
    if (id && userId) {
      dispatch(
        fetchCart({
          userId,
          restaurantId: id,
        })
      );
    }
  }, [dispatch, id, userId]);

  const removeItem = (foodId) => {
    dispatch(
      removeFromCart({
        userId,
        restaurantId: id,
        foodId,
      })
    );
  };

  const clear = () => {
    dispatch(
      clearCart({
        userId,
        restaurantId: id,
      })
    );

    window.location.reload();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-[#E0E3E6]">
      <h2 className="text-2xl font-bold text-[#2A3B4D] mb-6">Your Cart</h2>

      {cart.items.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-[#4A4A4A]">Your cart is empty</p>
          <p className="text-[#A79B8D] mt-2">
            Add items from the menu to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          <ul className="divide-y divide-[#E0E3E6]">
            {cart.items.map((item) => (
              <li key={item.foodId._id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-[#2A3B4D]">
                      {item.foodId.name}
                    </h3>
                    <p className="text-[#4A4A4A]">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem({ foodId: item.foodId._id })}
                    className="px-3 py-1.5 text-[#D87C5A] hover:text-[#C56947] font-medium rounded-lg hover:bg-[#F5F0E6] transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Price */}
          <div className="pt-4 border-t border-[#E0E3E6]">
            <p className="text-lg font-semibold text-[#2A3B4D]">
              Total: Rs. {cart.items.reduce((total, item) => total + (item.foodId.price * item.quantity), 0)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={clear}
              className="w-full px-4 py-2.5 text-[#2A3B4D] bg-[#E0E3E6] rounded-lg font-medium hover:bg-[#D87C5A] hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              Clear Cart
            </button>
            <button
              onClick={() => setIsCheckedOpen(true)}
              className="w-full px-4 py-2.5 text-white bg-[#8AA896] rounded-lg font-medium hover:bg-[#769382] transition-all transform hover:scale-105 active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckedOpen && (
        <CheckOut
          isOpen={setIsCheckedOpen}
          onclose={() => setIsCheckedOpen(false)}
        />
      )}
    </div>
  );
};

export default Cart;
