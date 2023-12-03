import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../slices/authSlice";

export const getUserIdFromToken = () => {
  const token = useSelector(selectCurrentToken);

  // Check if the token exists before decoding
  if (token) {
    const decoded = jwtDecode(token);
    return decoded._id;
  }

  // Return an empty string if there's no token
  return "";
};
