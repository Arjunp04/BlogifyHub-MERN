import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import axios from "axios";
import { URL } from "../url.js";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      // console.log(res)
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log("Error in logout", err);
    }
  };

  return (
    <div className="bg-white border border-gray-300 w-[200px] z-10 flex flex-col items-start absolute top-14 right-5 md:right-12 rounded divide-y divide-gray-200">
      {!user && (
        <Link
          to="/login"
          className="w-full text-blue-700 hover:text-white hover:bg-blue-700 cursor-pointer py-2 px-4 rounded-md font-bold"
        >
          Login
        </Link>
      )}

      {!user && (
        <Link
          to="/register"
          className="w-full text-blue-700 hover:text-white hover:bg-blue-700 cursor-pointer py-2 px-4 rounded-md font-bold"
        >
          Register
        </Link>
      )}

      {user && (
        <Link
          to={"/profile/" + user._id}
          className="w-full text-black hover:bg-gray-200 cursor-pointer py-2 px-4 font-bold"
        >
          Profile
        </Link>
      )}

      {user && (
        <Link
          to="/write"
          className="w-full text-black hover:bg-gray-200 cursor-pointer py-2 px-4 font-bold"
        >
          Write
        </Link>
      )}

      {user && (
        <Link
          to={"/myblogs/" + user._id}
          className="w-full text-black hover:bg-gray-200 cursor-pointer py-2 px-4 font-bold"
        >
          My blogs
        </Link>
      )}

      {user && (
        <h3
          onClick={handleLogout}
          className="w-full text-black hover:bg-gray-200 cursor-pointer py-2 px-4 font-bold"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
