import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  selectUserById,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../services/usersApi";

const UserDetails = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [deleteUser, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteUserMutation();

  const {
    data: usersData = [],
    isLoading,
    error,
    isSuccess,
  } = useGetAllUsersQuery();
  const user = useSelector((state) => selectUserById(state, userId));

  const handleDeleteUser = async () => {
    try {
      const isDeleteConfirmed = window.confirm(
        `Are you sure you want to delete account ${userId}?`
      );

      if (isDeleteConfirmed) {
        await deleteUser({ _id: userId });
        navigate("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isDeleting) {
    content = <p>Deleting user... Please wait!</p>;
  }

  if (isSuccess) {
    content = (
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-md p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {user.username}
            </h1>
            <h2 className="text-lg text-gray-600 mb-2">{user._id}</h2>
            <p className="text-gray-700 mb-2">
              Total Posts: {user.posts.length}
            </p>
            <p className="text-gray-700 mb-4">Total Reactions: XXXXX</p>
            <Link
              to={`/users/${userId}/edit`}
              className="text-blue-500 hover:underline"
            >
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2">
                Edit Profile Details
              </button>
            </Link>
            <button
              onClick={handleDeleteUser}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              {isDeleting ? "Deleting... ⌛" : "Delete Account ❌"}
            </button>
          </div>

          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Posts made by {user.username}
            </h2>
            <ul>
              {user.posts.map((post) => (
                <li key={post._id} className="mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {post.title}
                    </h2>
                    <p className="text-gray-700">{post.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    content = <p className="text-red-500">Error</p>;
  }

  return <div className="mt-8">{content}</div>;
};

export default UserDetails;
