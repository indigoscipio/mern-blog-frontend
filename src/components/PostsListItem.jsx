import React from "react";
import { Link } from "react-router-dom";
import { useDeletePostMutation } from "../services/postsApi";
import { formatCreatedAt } from "../utils/dateUtils";

const PostsListItem = ({ postsData, userId }) => {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDeletePost = async (post) => {
    try {
      const { _id: postId } = post;
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (isConfirmed && userId === post.author._id) {
        await deletePost({
          _id: postId,
          author: userId,
        }).unwrap();
      } else {
        window.alert("UNAUTHORIZED");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {postsData?.map((post) => (
        <li key={post._id} className="bg-white shadow-md rounded-md p-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {post.title}
          </h3>
          <h4 className="text-gray-600 mb-2">
            Posted at {formatCreatedAt(post.createdAt)}
          </h4>
          <h4 className="text-gray-600 mb-2">
            Posted by {post.author.username}
          </h4>
          <p className="text-gray-700">{post.content}</p>

          {post.author._id === userId && (
            <div className="flex items-center mt-4">
              <Link
                to={`posts/${post._id}/edit`}
                className="text-blue-500 hover:underline mr-4"
              >
                Edit Post
              </Link>
              <button
                onClick={() => handleDeletePost(post)}
                className={`text-red-500 hover:underline ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Deleting... ⌛" : "Delete Post ❌"}
              </button>
            </div>
          )}

          <Link
            to={`/posts/${post._id}`}
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            View Post
          </Link>
        </li>
      ))}
    </>
  );
};

export default PostsListItem;
