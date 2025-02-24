import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import useEditProfile from "../hooks/useEditProfile";
import useDisplayUser from "../hooks/useDisplayUser";


const EditProfile = () => {


    const {loading, editProfile} = useEditProfile()

    const {data} = useDisplayUser()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        location: ""
    });

    useEffect(() => {
        if (data) {
            setFormData({
                username: data?.username || "",
                email: data?.email || "",
                location: data?.location || ""
            });
        }
    }, [data]);                    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        await editProfile(formData) 
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F5F0E6] p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md border border-[#E0E3E6]">
                {/* Header */}
                <div className="p-6 border-b border-[#E0E3E6]">
                    <h2 className="text-2xl font-[Nunito-ExtraBold] text-[#2A3B4D] text-center">
                        Edit Profile
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all bg-[#F5F0E6] cursor-not-allowed"
                            disabled
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Enter your location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2.5 text-white bg-[#8AA896] rounded-lg font-[Nunito-Bold] hover:bg-[#769382] transition-all transform hover:scale-105 active:scale-95 shadow-md"
                    >
                        {loading ? "Loading..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
