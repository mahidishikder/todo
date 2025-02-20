import React, { useState, useEffect, useContext } from "react";
import { FaMoon, FaSun, FaBell, FaUser, FaCog, FaSearch, FaExclamationCircle, FaBars } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

function Navbar() {
  // const { user } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Dark Mode Toggle & Persisting in Local Storage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", newMode);
  };

  // Toggle Online/Offline Status
  const toggleStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <nav className="bg-gray-300 dark:bg-gray-900 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

        {/* Middle: Search Box (Hidden on Mobile, visible on larger screens) */}
        <div className="hidden md:flex relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500 dark:text-white" />
        </div>

        {/* Right: Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-gray-700 dark:text-white">
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button className="text-gray-700 dark:text-white">
            <FaExclamationCircle size={20} />
          </button>
          <button className="text-gray-700 dark:text-white relative">
            <FaBell size={20} />
          </button>
          <button className="text-gray-700 dark:text-white">
            <FaCog size={20} />
          </button>

          {/* Profile Icon with Avatar */}
          <div className="cursor-pointer" onClick={toggleStatus}>
            <div className={`w-10 rounded-full border-2 ${isOnline ? "border-green-500" : "border-red-500"}`}>
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
                className="rounded-full"
              />
            </div>
          </div>

          {/* Login Button */}
          <Link to={`/signIn`}><button className="bg-[#FF7F00] text-white px-4 py-2 rounded">
              Login
            </button></Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 dark:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-around items-center">
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-white">
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <button className="text-gray-700 dark:text-white">
              <FaExclamationCircle size={20} />
            </button>
            <button className="text-gray-700 dark:text-white">
              <FaBell size={20} />
            </button>
            <button className="text-gray-700 dark:text-white">
              <FaCog size={20} />
            </button>

            {/* Mobile Profile Avatar */}
            <div className="cursor-pointer" onClick={toggleStatus}>
              <div className={`w-10 rounded-full border-2 ${isOnline ? "border-green-500" : "border-red-500"}`}>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Mobile Login Button */}
          {user ? (
            <button onClick={logOut} className="bg-red-500 text-white px-4 py-2 rounded w-full">
              Logout
            </button>
          ) : (
            <Link to={`/signIn`}>
            <button className="bg-[#FF7F00] text-white px-4 py-2 rounded w-full">
              Login
            </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
