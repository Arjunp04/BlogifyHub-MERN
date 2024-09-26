import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url.js";
import { MdPerson, MdEmail, MdLock } from "react-icons/md";
import register from "/login.svg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);

  useEffect(() => {
    setAnimateLeft(true);
    setAnimateRight(true);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div
        className={`w-full md:w-1/2 flex justify-center items-center p-8 bg-gray-100 `}
      >
        <div
          className={`bg-white p-8 w-full max-w-md border rounded ${
            animateLeft ? "slide-in-left" : ""
          }`}
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <h1 className="text-4xl font-bold text-center mb-6 text-[#0018b7]">
            BlogifyHub
          </h1>

          <p className="text-center text-gray-600 mb-10">
            Join BlogifyHub today to become part of a vibrant community of
            bloggers and readers.
          </p>

          <form onSubmit={handleRegister}>
            <div className="relative mb-4">
              <MdPerson
                className="absolute left-3 top-3 text-gray-600"
                size={22}
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 pl-12 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-700"
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
            </div>
            <div className="relative mb-4">
              <MdEmail
                className="absolute left-3 top-3 text-gray-600"
                size={22}
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 pl-12 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-700"
                type="text"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
            <div className="relative mb-6">
              <MdLock
                className="absolute left-3 top-3 text-gray-600"
                size={22}
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pl-12 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-700"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-xl font-bold text-white bg-[#0018b7] rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>
          </form>

          {error && (
            <h3 className="text-red-500 text-sm mt-2 text-center">{error}</h3>
          )}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <p>Already have an account?</p>
            <p className="text-[#0018b7] hover:underline font-semibold">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`hidden md:flex md:w-1/2 ${
          animateRight ? "slide-in-right" : ""
        }`}
      >
        <img
          src={register}
          alt="register image"
          className="w-full h-full object-cover shadow-lg"
        />
      </div>
    </div>
  );
};

export default Register;
