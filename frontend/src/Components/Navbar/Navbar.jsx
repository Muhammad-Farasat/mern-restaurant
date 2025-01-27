import React from "react";
import useLogout from "../../Hooks/useLogout";

const Navbar = () => {
  const { loading, logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-gray-800 px-4 py-2 shadow-lg text-white">
        {/* Logo Section */}
        <div className="text-xl font-semibold">
          <span>MyApp</span>
        </div>

        {/* User Address Section */}
        <div className="text-center flex-grow text-sm md:text-base">
          <p className="truncate">My home</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-1 text-sm rounded-md hover:bg-red-700 transition-all"
        >
          Logout
        </button>
      </nav>
    </>
  );
};

export default Navbar;
