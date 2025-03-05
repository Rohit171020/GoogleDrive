import React from "react";

const Login = () => {
  const handleLogin = () => {
    try {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-900 text-white mt-52">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <p className="text-gray-400 mb-4">Access your account using Google</p>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
