import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {

    const navigate = useNavigate();
    const email = localStorage.getItem("user-email");

    useEffect(() => {
        if (!email) navigate("/signup");
    }, [email, navigate]);

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-[#F5F0E6] p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-[#E0E3E6]">
                    {/* Icon */}
                    <div className="mb-6">
                        <svg
                            className="w-16 h-16 mx-auto text-[#8AA896]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl font-[Nunito-ExtraBold] text-[#2A3B4D] mb-4">
                        Email Verification Required
                    </h2>

                    {/* Message */}
                    <div className="space-y-3 text-[#4A4A4A]">
                        <p>
                            We’ve sent a verification link to{" "}
                            <strong className="text-[#D87C5A]">{email}</strong>.
                        </p>
                        <p>
                            Please check your inbox and click the link to verify your account.
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default VerifyEmail