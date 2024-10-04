import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa"; // Import FaTimes for clear icon
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../Context/UserContext.jsx";

const Navbar = ({ searchQuery, onSearchChange, onSearch }) => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(); // Call the search function when Enter is pressed
    }
  };

  const clearSearch = () => {
    onSearchChange({ target: { value: "" } }); // Clear the search query
  };

  const { user } = useContext(UserContext);

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
        <Link to="/" className="inline-block pb-1">
          BlogifyHub
        </Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-2">
          <div className="relative w-48 sm:w-72 md:w-80 lg:w-96">
            <input
              value={searchQuery} // Bind the input value to searchQuery
              onChange={onSearchChange} // Call onSearchChange to update searchQuery state
              onKeyDown={handleKeyDown} // Call handleKeyDown for Enter key
              className="w-full pr-10 pl-10 rounded-full h-8 border-2 border-gray-300 focus:border-blue-800 focus:ring-1 focus:ring-blue-500 focus:outline-none text-black shadow-2xl"
              placeholder="Search a post"
              type="text"
            />
            <span
              onClick={onSearch} // Call onSearch when the search icon is clicked
              className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer text-gray-800"
            >
              <FaSearch size={18} />
            </span>
            {/* Clear Search Icon */}
            {searchQuery && ( // Only show the clear icon if there's text in the search bar
              <span
                onClick={clearSearch} // Call clearSearch when the clear icon is clicked
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer text-red-700 "
              >
                <FaTimes
                  size={25}
                  className="hover:rounded-full hover:bg-black hover:bg-opacity-10 p-1"
                />
              </span>
            )}
          </div>
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2">
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
          <div
            onClick={showMenu}
            className="hover:bg-black hover:bg-opacity-40 p-2 duration-200 rounded-full"
          >
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link
              to="/register"
              className="text-xl font-bold hover:text-slate-50 ml-2"
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
