import { useState, useEffect, useRef } from "react";
import useRestaurantLogout from "../../hooks/useRestaurantLogout";
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from "js-cookie";
import useLogout from "../../hooks/useLogout";
import { Modal } from "antd";
import useDisplayUser from "../../hooks/useDisplayUser";
import useAddFood from "../../hooks/useAddFood";
import { IoIosArrowDown } from "react-icons/io";
import useSpecificRestaurantToken from "../../hooks/useSpecificRestaurantToken";
import { useDispatch } from "react-redux";
import { addDish } from "../../redux/foodSlice";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';





const ProfileDropdown = () => {

    // User Type specification start

    const [userType, setUserType] = useState("");

    // Hooks
    const { data } = useDisplayUser()
    const { restaurantDetails } = useSpecificRestaurantToken()

    // Checking cookies
    const userData = Cookies.get("authorization");
    const restaurantData = Cookies.get("restaurant-auth");

    useEffect(() => {
        if (!userData) {
            setUserType("restaurant");
        } else if (!restaurantData) {
            setUserType("customer");
        }
    }, []);


    // User Type specification end

    const [isOpen, setIsOpen] = useState(false);


    const { loading, logout } = useLogout();
    const { restaurantLogout } = useRestaurantLogout();

    const nav = useNavigate()

    const handleNavigate = () => {
        nav('/order-tracking')
    }

    const handleLogout = async () => {
        userType === "customer" ? await logout() : await restaurantLogout();
    };

    const handleProfile = async () => {
        nav('/edit-profile')
    }
    const [open, setOpen] = useState(false);

    const handleDashboard = (restaurantId) => {
        console.log(restaurantData._id);
        nav(`/dashboard/${restaurantId}`)
    }

    const handleImage = (e) => {
        const { name, files, value } = e.target;
        setFoodData({ ...foodData, [name]: files ? files[0] : value });
    };

    const restaurantId = restaurantDetails?._id || null;

    const [foodData, setFoodData] = useState({
        name: "",
        description: "",
        price: "",
        image: null,
        restaurantId,
        foodId: null,
    });

    const { addFood, loading: addFoodLoading } = useAddFood();

    const dispatch = useDispatch()

    const handleSubmit = async () => {
        const response = await addFood({ foodData });
        console.log(response.status);

        if (response.status === 200) {
            dispatch(addDish(response.data.food))
            setOpen(false)
        }

    };

    const dropDownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [])

    return (
        <div className="relative" ref={dropDownRef} >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
                <DotLottieReact
                    src="https://lottie.host/343026b8-10c2-4460-9025-dca01e3bb10f/iLjPaTqMPv.lottie"
                    loop
                    autoplay    
                    width={24}
                    height={24}
                />

                <span className="flex items-center gap-2">
                    {
                        userType === 'customer' ?
                            data?.username : restaurantDetails?.name
                    }
                    <IoIosArrowDown />
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 ">
                    {
                        userType === 'customer' ?
                            <ul className="py-2">
                                <li onClick={handleProfile} className="px-4 py-2 text-[#D87C5A] hover:bg-gray-100 cursor-pointer">
                                    Edit Profile
                                </li>
                                <li
                                    onClick={handleNavigate}
                                    className="px-4 py-2  text-[#D87C5A] rounded-lg hover:bg-gray-100 cursor-pointer "
                                >
                                    {loading ? "loading" : "Order Tracking"}
                                </li>
                                <li
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-[#D87C5A] rounded-lg hover:bg-gray-100 cursor-pointer "
                                >
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                                        </div>
                                    ) : (
                                        'Logout'
                                    )}
                                </li>

                            </ul>
                            :

                            <ul>
                                <li
                                    onClick={() => setOpen(true)}
                                    className="px-4 py-2 text-[#D87C5A] hover:bg-gray-100 cursor-pointer"
                                >
                                    Upload Item
                                </li>

                                <li
                                    onClick={() => handleDashboard(restaurantDetails._id)}
                                    className="px-4 py-2 text-[#D87C5A] hover:bg-gray-100 cursor-pointer"
                                >
                                    Dashboard
                                </li>

                                <li
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-[#D87C5A] hover:bg-gray-100 cursor-pointer"
                                >
                                    Logout
                                </li>
                            </ul>
                    }
                </div>
            )}


            <Modal
                title={<p className="text-xl font-[Nunito-ExtraBold] text-[#2A3B4D]">Upload Food Item</p>}
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                className="rounded-xl"
            >
                <div className="space-y-5">
                    {/* Food Name */}
                    <div>
                        <label className="block text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                            Food Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={foodData.name}
                            onChange={(e) => setFoodData({ ...foodData, name: e.target.value })}
                            placeholder="Enter food name"
                            className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={foodData.description}
                            onChange={(e) => setFoodData({ ...foodData, description: e.target.value })}
                            placeholder="Enter food description"
                            className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all h-32"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                            Price (Rs.)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={foodData.price}
                            onChange={(e) => setFoodData({ ...foodData, price: e.target.value })}
                            placeholder="Enter price"
                            className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleImage}
                            className="w-full border border-[#A79B8D] rounded-lg file:px-4 file:py-2 file:bg-[#E0E3E6] file:text-[#4A4A4A] file:rounded-lg file:border-none file:shadow-sm file:hover:bg-[#D87C5A] file:hover:text-white transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full px-4 py-2.5 text-white bg-[#8AA896] rounded-lg font-[Nunito-Bold] hover:bg-[#769382] transition-all transform hover:scale-105 active:scale-95 shadow-md"
                    >
                        {addFoodLoading ? (
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            'Upload Item'
                        )}
                    </button>
                </div>
            </Modal>


        </div>
    );
};

export default ProfileDropdown;
