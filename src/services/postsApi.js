import { api } from "./api";

export const postsApi = api.injectEndpoints({
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post", "User"],
    }),
    getSinglePost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: ["Post", "User"],
    }),
    createNewPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post", "User"],
    }),
    editPost: builder.mutation({
      query: (updatedPost) => ({
        url: `/posts`,
        method: "PATCH",
        body: updatedPost,
      }),
      invalidatesTags: ["Post", "User"],
    }),
    deletePost: builder.mutation({
      query: (deletedPost) => ({
        url: `/posts`,
        method: "DELETE",
        body: deletedPost,
      }),
      invalidatesTags: ["Post", "User"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreateNewPostMutation,
  useGetSinglePostQuery,
  useEditPostMutation,
  useDeletePostMutation,
} = postsApi;
