import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Editor from "../components/Editor";
import LetterList from "../components/LetterList";

const Home = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const accessToken = new URLSearchParams(location.search).get("accessToken");

  useEffect(() => {
    if (token && accessToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("accessToken", accessToken);
      window.history.replaceState({}, document.title, "/");
    }
  }, [token, accessToken]);

  const storedToken = localStorage.getItem("token");
  const storedAccessToken = localStorage.getItem("accessToken");

  return (
    <div className="h-full bg-gray-900 text-white flex items-center justify-center ">
      {storedToken ? (
        <div className="w-full max-w-4xl p-6">
          <h1 className="text-3xl font-bold text-center mb-4">Welcome Back!</h1>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <Editor accessToken={storedAccessToken} />
            <LetterList />
          </div>
        </div>
      ) : (
        <div className="text-center mt-52">
          <h1 className="text-3xl font-semibold">Please login to continue</h1>
          <p className="text-gray-400 mt-2">
            Access your letters and start editing.
          </p>
          <h1 className="">If Loggen In Already. Please refresh!!!!!!</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
