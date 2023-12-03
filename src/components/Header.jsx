import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../services/authApi";
import { getUserIdFromToken } from "../utils/authUtils";

const Header = () => {
  const userId = getUserIdFromToken();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const handleLogout = async () => {
    await sendLogout();
    navigate("/signin");
  };

  const isUnprotectedRoute = pathname === "/signin" || pathname === "/signup";

  const renderBrandLink = () => (
    <Link
      to={isUnprotectedRoute ? "/signin" : "/"}
      className="text-2xl font-bold text-gray-800 hover:underline"
    >
      Anime Blogz
    </Link>
  );

  const renderAuthLinks = () => {
    if (isUnprotectedRoute) {
      return (
        <Link
          to="/signup"
          className="text-gray-600 hover:text-gray-800 hover:underline"
        >
          Register
        </Link>
      );
    }

    return (
      <>
        <Link
          to="/users"
          className="text-gray-600 hover:text-gray-800 hover:underline"
        >
          Browse Users
        </Link>
        <Link
          to={`/users/${userId}`}
          className="text-gray-600 hover:text-gray-800 hover:underline"
        >
          Profile Setting
        </Link>
        <Link
          to="/create"
          className="text-gray-600 hover:text-gray-800 hover:underline"
        >
          Create New Post
        </Link>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-800 hover:underline"
        >
          Log Out
        </button>
      </>
    );
  };

  return (
    <header className="bg-slate-50 shadow-md py-4">
      <nav className="container mx-auto flex justify-between items-center">
        {renderBrandLink()}
        <ul className="flex space-x-4">{renderAuthLinks()}</ul>
      </nav>
    </header>
  );
};

export default Header;
