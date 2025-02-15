import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/verify-email/${token}`);
                toast.success(response.data.message);
                setVerified(true);
                setTimeout(() => navigate("/login"), 3000);  // Redirect to login after 3 seconds
            } catch (error) {
                toast.error("Invalid or expired link.");
                setVerified(false);
            }
        };
        verify();
    }, [token, navigate]);

    return (
        <div className="container">
            {verified ? <h2>Email Verified! ✅ Redirecting...</h2> : <h2>Verifying your email...</h2>}
        </div>
    );
}

export default VerifyEmail;
