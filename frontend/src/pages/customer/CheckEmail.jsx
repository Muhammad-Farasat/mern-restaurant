import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useResendEmail from '../../hooks/auth/customer/useResendEmail';
import toast from 'react-hot-toast';

const VerifyEmail = () => {

    const navigate = useNavigate();
    const email = localStorage.getItem("user-email");

    useEffect(() => {
        if (!email) navigate("/signup");
    }, [email, navigate]);

    const { success, resendVerificationEmail, loading } = useResendEmail()

    const handleResendEmail = () => {
        resendVerificationEmail(email)

        if (success) {
            toast.success("Email has been resent")
        }
    }


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

                    <div className='mt-4 w-32 mx-auto '>
                        <button onClick={handleResendEmail} className={`w-full px-4 py-2.5 text-xs text-white rounded-lg font-[Nunito-Bold]  transition-all transform hover:scale-105 active:scale-95 shadow-md ${loading ? "bg-[#cd8a6f] cursor-not-allowed " : "bg-[#D87C5A] hover:bg-[#cd8a6f]"}`}>Resend E-mail</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default VerifyEmail