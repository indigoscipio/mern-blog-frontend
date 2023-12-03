import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { api } from "./api";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
});

const initialState = usersAdapter.getInitialState();

export const usersApi = api.injectEndpoints({
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: ["User", "Post"],
    }),
    createNewUser: builder.mutation({
      query: (newUserData) => ({
        url: "/users",
        method: "POST",
        body: { ...newUserData },
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (updatedUserData) => ({
        url: "/users",
        method: "PATCH",
        body: { ...updatedUserData },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: ({ _id }) => ({
        url: "/users",
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const selectAllUsersResult = usersApi.endpoints.getAllUsers.select();

const selectAllUsersData = createSelector(
  selectAllUsersResult,
  (usersResult) => usersResult.data
);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(
    (state) => selectAllUsersData(state) ?? initialState
  );

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useCreateNewUserMutation,
  useDeleteUserMutation,
} = usersApi;
