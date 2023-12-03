// SignUp.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateNewUserMutation } from "../services/usersApi";
import { useLoginMutation } from "../services/authApi";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    login,
    {
      isLoading: loginIsLoading,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
    },
  ] = useLoginMutation();
  const [
    createNewUser,
    {
      isLoading: createNewUserIsLoading,
      isSuccess: createNewUserIsSuccess,
      isError: createNewUserIsError,
    },
  ] = useCreateNewUserMutation();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const newUser = await createNewUser({
      email,
      username: name,
      password,
    });

    console.log(newUser);
    console.log("Signing up with:", name, email, password);

    handleSignIn();
  };

  const handleSignIn = async () => {
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }

    console.log("Signing in with:", email, password);
  };

  if (createNewUserIsLoading) {
    return <p>Creating new user...</p>;
  }

  return (
    <div className="my-32 max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
        <Link to="/signin" className="text-blue-500 hover:underline">
          Already have an account? Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
