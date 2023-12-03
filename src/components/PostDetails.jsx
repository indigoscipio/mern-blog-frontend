// PostDetails.js

import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../services/postsApi";
import { getUserIdFromToken } from "../utils/authUtils";
import Loader from "./Loader";

const PostDetails = () => {
  const { id } = useParams();
  const userId = getUserIdFromToken();

  const {
    data: postData,
    isLoading,
    isSuccess,
    error,
  } = useGetSinglePostQuery(id);

  let content;

  if (isLoading) {
    content = <Loader />;
  }

  if (isSuccess) {
    content = (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">
          Post Title: {postData.title}
        </h1>
        <h2 className="text-lg mb-2">Posted by: {postData.author.username}</h2>
        <p className="text-gray-500 mb-2">Post Id: {postData._id}</p>
        <p className="mb-4">{postData.content}</p>
        {postData.author._id === userId ? (
          <Link to={`/posts/${id}/edit`}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Edit Post
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }

  if (error) {
    content = <p className="text-red-500">Error fetching post data!</p>;
  }

  return <div className="mt-8">{content}</div>;
};

export default PostDetails;
