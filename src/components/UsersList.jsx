import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers, useGetAllUsersQuery } from "../services/usersApi";
import Loader from "./Loader";

const UsersList = () => {
  const {
    data: usersData = [],
    isLoading,
    error,
    isSuccess,
  } = useGetAllUsersQuery();

  const allUsers = useSelector((state) => selectAllUsers(state));

  let content;

  if (isLoading) {
    content = <Loader />;
  }

  if (isSuccess) {
    content = (
      <div className="container mx-auto">
        <ul className="mt-4">
          {allUsers.map((user) => (
            <li
              key={user._id}
              className="bg-white shadow-md rounded-md p-4 mb-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {user.username}
              </h3>
              <p className="text-gray-600">{user.email}</p>
              {/* Add other user details if needed */}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) {
    content = <p className="text-red-500">Error</p>;
  }

  return <div>{content}</div>;
};

export default UsersList;
