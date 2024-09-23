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
    <div className="bg-white border border-gray-300 w-[200px] z-10 flex flex-col items-start absolute top-14 right-5 md:right-32 rounded-md divide-y divide-gray-200">
      {!user && (
        <h3 className="w-full text-blue-700 hover:text-white hover:bg-blue-700 cursor-pointer py-2 px-4 rounded-md font-bold">
          <Link to="/login">Login</Link>
        </h3>
      )}

      {!user && (
        <h3 className="w-full text-blue-700 hover:text-white hover:bg-blue-700 cursor-pointer py-2 px-4 rounded-md font-bold">
          <Link to="/register">Register</Link>
        </h3>
      )}

      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/profile/" + user._id}>Profile</Link>
        </h3>
      )}

      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/write">Write</Link>
        </h3>
      )}

      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/myblogs/" + user._id}>My blogs</Link>
        </h3>
      )}

      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-500 cursor-pointer"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
