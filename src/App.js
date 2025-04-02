import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HotelDetails from './components/HotelDetails';
import HomePage from './homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import { useDispatch, useSelector } from "react-redux";
import { authUser } from './redux/actions/authActions';
import Loading from './components/Loading';
import { useState } from "react";
import { privateAxios } from "./services/axios.service";
import BookingPage from './components/Bookingpage';
import PaymentPage from './components/Paymentpage';


const App = () => {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { isHotelLoading } = useSelector((state) => state.vendors);

  useEffect(() => {
    //request interceptor
    privateAxios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    //response interceptor
    privateAxios.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );


    dispatch(authUser());
  }, []);



  return (

    <BrowserRouter>
      <Loading show={isLoading || isHotelLoading || loading} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HotelDetails" element={<HotelDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
