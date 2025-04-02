import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUpAction } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // Updated field for confirmPassword
    phone: "",
  });

  const [error, setError] = useState(""); // State to handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {

console.log("hi")
    // Basic validation checks
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
     dispatch(signUpAction(formData))
    setError(""); // Clear any previous error

    // Handle sign-up logic here (API call, form submission, etc.)
    console.log("Form submitted", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <div className="bg-white p-6 rounded shadow-2xl w-80" >
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Error message */}


        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your Name"
            value={formData.Name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>


        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"  // Corrected comment syntax 
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg"
          onClick ={()=>handleSubmit()}
        >
          Sign Up
        </button>
      </div>
      <p className="text-sm text-gray-600 text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
