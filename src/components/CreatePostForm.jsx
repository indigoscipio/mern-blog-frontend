// CreatePostForm.js

import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateNewPostMutation } from "../services/postsApi";
import { selectCurrentToken } from "../slices/authSlice";

const CreatePostForm = () => {
  const token = useSelector(selectCurrentToken);
  const decoded = jwtDecode(token);
  const userId = decoded._id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [addNewPost, { isLoading, isError, isSuccess }] =
    useCreateNewPostMutation();

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (canSave && userId) {
      try {
        await addNewPost({
          title,
          content,
          author: userId,
        });

        console.log(`Created! title: ${title}, content: ${content}`);

        navigate("/");
      } catch (err) {
        console.error("Failed to create post: ", err);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md my-24">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title:
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            id="title"
            name="title"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Content:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="content"
            name="content"
            rows="4"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          disabled={!canSave}
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
