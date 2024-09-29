import { useState } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  BACKEND_URL,
  VITE_EMAILJS_PUBLIC_KEY,
  VITE_EMAILJS_SERVICE_ID,
  VITE_FRONTEND_URL,
  VITE_EMAILJS_TEMPLATE_ID,
} from "../url.js";
import Loader from "../Components/Loader.jsx";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/forgot-password`, {
        email,
      });
      console.log("fp frontend response:", res);

      const { token } = res.data;

      // Prepare the data object for EmailJS API
      const data = {
        service_id: VITE_EMAILJS_SERVICE_ID,
        template_id: VITE_EMAILJS_TEMPLATE_ID,
        user_id: VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          from_email: email,
          token: token,
          domain: VITE_FRONTEND_URL,
        },
      };

      // Sending email using Axios to EmailJS API
      const emailResponse = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("********************");
      console.log(emailResponse);

      setEmail("");
      setMessage("Reset link has been sent to your email.");
      setMessageType("success");
      setIsEmailSent(true);
      setIsLoading(false);
    } catch (err) {
      setMessage("Error sending email. Please try again.");
      setIsLoading(false);
      setMessageType("error");
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-8 bg-gray-100">
      <div
        className="bg-white p-8 w-full max-w-md border rounded"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <h1 className="text-4xl font-bold text-center mb-10 text-[#0018b7]">
          BlogifyHub
        </h1>
        {!isEmailSent ? (
          <>
            <h1 className="text-lg font-medium text-center mb-10 text-gray-800">
              Enter your email to reset your password
            </h1>
            <form onSubmit={handleForgotPassword}>
              <div className="relative mb-6">
                <MdEmail
                  className="absolute left-3 top-3 text-gray-600"
                  size={22}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 pl-12 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 text-xl font-bold text-white bg-[#0018b7] rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {isloading ? <Loader /> : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : null}

        {message && (
          <h3
            className={`${
              messageType === "success" ? "text-green-600" : "text-red-600"
            } text-sm mt-2 text-center`}
          >
            {message}
          </h3>
        )}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <p>Remembered your password?</p>
          <p className="text-[#0018b7] hover:underline font-medium">
            <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
