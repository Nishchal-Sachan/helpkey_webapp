import Login from "./Login";
import Signup from "./Signup"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/actions/authActions";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // State for Sign Up modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for Log In modal
  const {isAuthenticated} = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close
  };

  const closeAllModals = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(false);
  };

  const handleModalBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      closeAllModals();
    }
  };

  return (
    <div className="container mx-auto w-full bg-white">
      <div className="flex justify-between items-center px-6 py-3 text-[#1D2541]">
        {/* Logo */}
        <div className="text-xl font-bold">Helpkey</div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#1D2541] focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Links for Larger Screens */}
        <div className="hidden md:flex space-x-6 text-sm text-gray-700">
          <a href="#">All Cities</a>
          <a href="#">Download App</a>
          <a href="#">Corporate Enquiry</a>
          <a href="#">Refer & Earn</a>
          <a href="#">A-List</a>
        </div>

        {/* Auth Links for Larger Screens */}
        
        <div className="hidden md:flex space-x-4 text-sm">
        {!isAuthenticated ? <><button
            onClick={() => setIsSignUpModalOpen(true)}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-blue-600 hover:underline"
          >
            Log In
          </button></> :
          <button
            onClick={() => dispatch(logOut())}
            className="text-blue-600 hover:underline"
          >
            Log Out
          </button>}
        </div>
       
      </div>

      {/* Mobile View for Links and Auth Links */}
      <div className={`md:hidden mt-2 space-y-2 pl-4 ${isMenuOpen ? "block" : "hidden"}`}>
        <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-sm text-gray-700">
          All Cities
        </a>
        <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-sm text-gray-700">
          Download App
        </a>
        <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-sm text-gray-700">
          Corporate Enquiry
        </a>
        <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-sm text-gray-700">
          Refer & Earn
        </a>
        <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-sm text-gray-700">
          A-List
        </a>

        <div>
          <button
            onClick={() => {
              setIsSignUpModalOpen(true);
              setIsMenuOpen(false);
            }}
            className="block text-sm font-bold text-gray-900"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsMenuOpen(false);
            }}
            className="block py-2 text-sm font-bold text-gray-900"
          >
            Log In
          </button>
        </div>
      </div>

      {/* Sign Up Modal */}
      {isSignUpModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleModalBackgroundClick}
        >
          <div className="bg-white w-full max-w-md m-3 p-6 rounded-lg relative">
           <Signup/>
          </div>
        </div>
      )}

      {/* Log In Modal */}
      {isLoginModalOpen && (
       <> <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleModalBackgroundClick}
      >
        <div className="bg-white w-full max-w-md m-3 p-6 rounded-lg relative">
          
          <Login/>
        </div>
        
      </div>
        </>
      )}
    </div>
  );
};

export default Header;
