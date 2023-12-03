import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateUserMutation } from "../services/usersApi";
import { useRefreshMutation } from "../services/authApi";

const EditUserForm = () => {
  const { id: userId } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [updateUser, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateUserMutation();
  const [refresh, { isLoading: isRefreshing, isSuccess: isRefreshed }] =
    useRefreshMutation();

  const handleEditUserForm = async (e) => {
    e.preventDefault();

    try {
      if (isRefreshing || !isRefreshed) {
        await refresh();
      }

      await updateUser({
        _id: userId,
        username,
        email,
      });

      navigate(`/users/${userId}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (isUpdating) {
    return <p>Updating user... Please wait...</p>;
  }

  return (
    <div>
      <h2>Edit User Details</h2>
      <form onSubmit={handleEditUserForm}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Details</button>
      </form>
    </div>
  );
};

export default EditUserForm;
