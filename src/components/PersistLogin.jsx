import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useRefreshMutation } from "../services/authApi";
import { selectCurrentToken } from "../slices/authSlice";
import Loader from "./Loader";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const [refresh, { isLoading, isSuccess, isError, isUninitialized }] =
    useRefreshMutation();
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token...");

        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!token) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, []);

  let content;

  if (isLoading) {
    console.log("loading...");
    content = <Loader />;
  } else if (isError) {
    console.log("error");
    content = (
      <div className="container mx-auto my-32">
        <Link
          to="/signin"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Error! Please Login Again
        </Link>
      </div>
    );
  } else if (isSuccess) {
    console.log("VerifyRefresh Success!");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token & unInitialized");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return <>{content}</>;
};

export default PersistLogin;
