import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../slices/authSlice";

//prepare header
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

//basequery with reAuth
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log("sending refresh token...");
  const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

  //If token refresh is successful, update credentials and retry the original request
  if (refreshResult?.data) {
    api.dispatch(setCredentials({ ...refreshResult.data }));

    // Check if the original request succeeded
    if (result.error) {
      return result; // Use the original result
    }
  } else {
    if (refreshResult?.error.status === 403) {
      refreshResult.error.data.message = "Your login has expired";
    }
    return refreshResult;
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export const {} = api;
