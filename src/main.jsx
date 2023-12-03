import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Root from "./components/Root.jsx";
import App from "./App";
import CreatePostForm from "./components/CreatePostForm";
import UserDetails from "./components/UserDetails";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PostDetails from "./components/PostDetails";
import EditPostForm from "./components/EditPostForm";
import UsersList from "./components/UsersList";
import PersistLogin from "./components/PersistLogin";
import EditUserForm from "./components/EditUserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            path: "/",
            index: true,
            element: <App />,
          },
          {
            path: "/create",
            element: <CreatePostForm />,
          },
          {
            path: "/users",
            element: <UsersList />,
          },
          {
            path: "/users/:id",
            element: <UserDetails />,
          },
          {
            path: "/users/:id/edit",
            element: <EditUserForm />,
          },
          {
            path: "/posts/:id",
            element: <PostDetails />,
          },
          {
            path: "/posts/:id/edit",
            element: <EditPostForm />,
          },
        ],
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
