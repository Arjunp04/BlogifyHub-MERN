import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../Context/UserContext.jsx";


const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
    };
    
    const handleSearch = () => {
      if (prompt) {
        navigate("?search=" + prompt);
      } else {
        navigate("/");
      }
    };

      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      };

  const { user } = useContext(UserContext);
  // console.log(user)

  return (
    <div
      className="bg-[#0b05b4] text-white flex items-center justify-between
     py-4 px-5 md:px-10 rounded-b-2xl sticky top-0 z-50"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <h1 className="text-xl md:text-xl font-extrabold tracking-wide">
        <Link to="/" className=" inline-block pb-1">
          BlogifyHub
        </Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-2">
          <div className="relative w-48 sm:w-72 md:w-80 lg:w-96">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pr-2 pl-10 rounded-full h-8 border-2 border-gray-300 focus:border-blue-800 focus:ring-1 focus:ring-blue-500 focus:outline-none text-black shadow-2xl"
              placeholder="Search a post"
              type="text"
            />
            <span
              onClick={handleSearch}
              className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer text-gray-800"
            >
              <FaSearch size={18} />
            </span>
          </div>
        </div>
      )}
      <div className=" hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write" className="text-xl font-bold hover:text-gray-50">
              Write
            </Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login" className="text-xl font-bold hover:text-gray-50">
              Login
            </Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu} className="hover:bg-black bg-opacity-50 duration-200 rounded-full">
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link
              to="/register"
              className="text-xl font-bold hover:text-slate-50"
            >
              Register
            </Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
