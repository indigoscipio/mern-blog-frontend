import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../slices/authSlice";
import PostsList from "./PostsList";

const HomePage = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const token = useSelector(selectCurrentToken);
  const decoded = jwtDecode(token);

  return (
    <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {decoded.username}
      </h1>
      <p className="text-gray-600 mb-4">Today is {formattedDate}</p>
      <PostsList />
    </div>
  );
};

export default HomePage;
