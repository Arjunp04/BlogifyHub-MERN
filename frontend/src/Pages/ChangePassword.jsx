import { useEffect, useState } from "react";
import axios from "axios";
import { MdLock } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/animations.css";
import {
  BACKEND_URL,
} from "../url.js";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // For success/failure colors
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/reset-password`, {
        token,
        newPassword,
      });
      console.log("**************************");
      console.log(res)

      setMessage(res.data.message);
      setMessageType("success");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful reset
      }, 2000);
    } catch (err) {
      setMessage("Error resetting password. Please try again.");
      setMessageType("error");
      console.log(err)
    }
  };
  return (
    <div className="w-full flex justify-center items-center p-8 bg-gray-100 min-h-screen">
      <div
        className={`bg-white p-8 w-full max-w-md border rounded ${
          animate ? "scale-in" : ""
        }`}
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <h1 className="text-4xl font-bold text-center mb-10 text-[#0018b7]">
          BlogifyHub
        </h1>
        <h1 className="text-lg font-medium text-center mb-10 text-gray-800">
          Reset your password below
        </h1>
        <form onSubmit={handlePasswordReset}>
          <div className="relative mb-4">
            <MdLock className="absolute left-3 top-3 text-gray-600" size={22} />
            <input
              type="password"
              placeholder="Enter old password"
              className="w-full px-4 py-2 pl-12 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-700"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-6">
            <MdLock className="absolute left-3 top-3 text-gray-600" size={22} />
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 pl-12 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-700"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-xl font-bold text-white bg-[#0018b7] rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>

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

export default ChangePassword;
