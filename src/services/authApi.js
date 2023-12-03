import { api } from "./api";
import { logOut, setCredentials } from "../slices/authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({ url: "/auth/refresh", method: "GET" }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(logOut());
          dispatch(api.util.resetApiState());
          await queryFulfilled;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useSendLogoutMutation } =
  authApi;
