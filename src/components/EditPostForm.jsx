// EditPostForm.js

import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditPostMutation,
  useGetSinglePostQuery,
} from "../services/postsApi";
import { getUserIdFromToken } from "../utils/authUtils";

const EditPostForm = () => {
  const { id } = useParams();
  const { data: postData } = useGetSinglePostQuery(id);
  const [editPost, { isLoading }] = useEditPostMutation();
  const navigate = useNavigate();
  const author = getUserIdFromToken();

  const [title, setTitle] = useState(postData?.title || "");
  const [content, setContent] = useState(postData?.content || "");

  const handleFormUpdate = async (event) => {
    event.preventDefault();

    try {
      await editPost({ _id: id, title, content, author });
      navigate(`/posts/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-24 max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Post {id}</h2>

      <form onSubmit={handleFormUpdate} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            id="title"
            name="title"
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="content"
            name="content"
            className="mt-1 p-2 border rounded-md w-full"
            required
          ></textarea>{" "}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {isLoading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
