import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  clearCartState,
  clearCart,
  increaseItemCart,
  decreaseItemCart,
} from "../../redux/cartSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckOut from "./CheckOut";
import useUserProfile from "../../hooks/user/useUserProfile"
import Counter from '../comman/Counter/Counter';




const Cart = () => {

  let { id } = useParams();

  const [isCheckedOpen, setIsCheckedOpen] = useState(false)

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // const fetchCookies = JSON.parse(Cookies.get("user-data"));

  const { data } = useUserProfile()
  const userId = data._id;

  useEffect(() => {
    if (id && userId) {
      dispatch(fetchCart({ userId, restaurantId: id }));
    }
  }, [dispatch, id, userId]);

  const removeItem = (foodId) => {
    dispatch(removeFromCart({ userId, restaurantId: id, foodId }));
  };

  const clear = () => {
    dispatch(clearCart({ userId, restaurantId: id }));
    window.location.reload();
  };

  const handleIncrease = (foodId) => {
    dispatch(increaseItemCart({ userId, restaurantId: id, foodId }))
  }

  const handleDecrease = (foodId) => {
    dispatch(decreaseItemCart({ userId, restaurantId: id, foodId }))
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-[#E0E3E6]">
      <h2 className="text-2xl font-[Nunito-ExtraBold] text-[#2A3B4D] mb-6">Your Cart</h2>
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
                    <h3 className="text-lg font-[Nunito-Bold] text-[#2A3B4D]">
                      {item.foodId.name}
                    </h3>
                    <p className="text-[#4A4A4A]">
                      Price: Rs. {item.foodId.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrease(item.foodId._id)}
                      className="px-2 py-1 bg-[#E0E3E6] rounded-md hover:bg-[#D87C5A] hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <Counter
                      value={item.quantity}
                      places={[10, 1]}
                      fontSize={18}
                      padding={0}
                      gap={1}
                      textColor="black"
                      fontWeight={900}
                    />
                    <button
                      onClick={() => handleIncrease(item.foodId._id)}
                      className="px-2 py-1 bg-[#8AA896] text-white rounded-md hover:bg-[#769382] transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.foodId._id)}
                      className="px-3 py-1.5 text-[#D87C5A] hover:text-[#C56947] font-[Nunito-Bold] rounded-lg hover:bg-[#F5F0E6] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Total Price */}
          <div className="pt-4 border-t border-[#E0E3E6]">
            <p className="text-lg font-[Nunito-Bold] text-[#2A3B4D]">
              Total: Rs.{" "}
              {cart.items.reduce(
                (total, item) => total + item.foodId.price * item.quantity,
                0
              )}
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={clear}
              className="w-full px-4 py-2.5 text-[#2A3B4D] bg-[#E0E3E6] rounded-lg font-[Nunito-Bold] hover:bg-[#D87C5A] hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              Clear Cart
            </button>
            <button
              onClick={() => setIsCheckedOpen(true)}
              className="w-full px-4 py-2.5 text-white bg-[#8AA896] rounded-lg font-[Nunito-Bold] hover:bg-[#769382] transition-all transform hover:scale-105 active:scale-95"
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
