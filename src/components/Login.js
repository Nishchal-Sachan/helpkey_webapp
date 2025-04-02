import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, msg, token, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    //console.log(error,msg,token,"new token")
    if (isAuthenticated) {
      navigate('/')
    }
  }, [error, msg, token, isAuthenticated]);
  const handleSubmit = () => {
    dispatch(loginUser(email, password));

  };

  return (
    <>
      <Loading show={isLoading} />
      <div className="flex flex-col items-center justify-center">

        <h1 className="text-3xl font-bold mb-4">Login Page</h1>

        {/* Login Form */}
        <div
          className="bg-white p-6 rounded shadow-2xl w-80"
        >
          {/* // {error && <p className="text-red-500 text-sm mb-3">{error}</p>} */}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg"
            onClick={() => handleSubmit()}
          >
            Login
          </button>
          <div className="pt-4 text-center">
            {error && <div className="text-red-500">{error}</div>}
            {msg && <div className="text-red-500">{msg}</div>}
          </div>
        </div>


        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};


