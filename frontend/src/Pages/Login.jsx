import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../url.js";
import { UserContext } from "../Context/UserContext";
import { MdEmail, MdLock } from "react-icons/md";
import login from "/login.svg";
import "../css/animations.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post(
        BACKEND_URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(res);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="hidden md:flex md:w-1/2">
        <img
          src={login}
          alt="login image"
          className={`w-full h-full object-cover shadow-lg ${
            animate ? "scale-in" : ""
          }`}
        />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-gray-100">
        <div
          className={`bg-white p-8 w-full max-w-md border rounded ${
            animate ? "scale-in" : ""
          }`}
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <Link to="/">
            <h1 className="text-4xl font-bold text-center mb-10 text-[#0018b7]">
              BlogifyHub
            </h1>
          </Link>

          <h1 className="text-lg font-medium text-center mb-10 text-gray-800">
            Please enter your details to sign in
          </h1>
          <form onSubmit={handleLogin}>
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

            <p className="text-[#0f2be3]  text-sm text-right -mt-3 mb-3 hover:underline font-medium">
              <Link to="/forgot-password">Forgot Password ?</Link>
            </p>
            <button
              type="submit"
              className="w-full px-4 py-3 text-xl font-bold text-white bg-[#0018b7] rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Log in
            </button>
          </form>

          {error && (
            <h3 className="text-red-500 text-sm mt-2 text-center">{error}</h3>
          )}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <p>Don't have an account?</p>
            <p className="text-[#0018b7] hover:underline font-medium">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
