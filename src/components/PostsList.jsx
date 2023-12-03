import React from "react";
import { useGetAllPostsQuery } from "../services/postsApi";
import { useMemo } from "react";
import PostsListItem from "./PostsListItem";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../slices/authSlice";

const PostsList = () => {
  const [sortBy, setSortBy] = useState("newestFirst");
  const token = useSelector(selectCurrentToken);
  const decoded = jwtDecode(token);
  const userId = decoded._id;

  const {
    data: postsData = [],
    isLoading: postsIsLoading,
    isSuccess: postsIsSuccess,
    error: postsError,
  } = useGetAllPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = [...postsData];

    if (sortBy === "newestFirst") {
      sortedPosts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else if (sortBy === "oldestFirst") {
      sortedPosts.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }

    return sortedPosts;
  }, [postsData, sortBy]);

  let content;

  if (postsIsLoading) {
    content = <p className="text-gray-600">Loading... Please wait...</p>;
  }
  if (postsIsSuccess) {
    content = (
      <ul>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Filter Post By:{" "}
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          name="sort"
          id="sort"
          className="bg-gray-100 p-2 rounded-md mb-4"
        >
          <option value="newestFirst">Newest First</option>
          <option value="oldestFirst">Oldest First</option>
        </select>
        <PostsListItem postsData={sortedPosts} userId={userId} />
      </ul>
    );
  }

  if (postsError) {
    content = <p className="text-red-500">Page error</p>;
  }

  return (
    <section className="mt-8">
      {postsData?.length === 0 ? (
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          There are 0 posts...
        </h2>
      ) : (
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Posts</h2>
      )}
      {content}
    </section>
  );
};

export default PostsList;
