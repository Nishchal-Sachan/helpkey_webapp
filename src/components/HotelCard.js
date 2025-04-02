import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {selectHotel} from '../redux/actions/vendorAction';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(null);

  // Function to calculate Haversine distance
  function getDistance(lat1, lon1, lat2, lon2) {
    const toRad = (angle) => (angle * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  // Get user's location & calculate distance
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        if (hotel.latitude && hotel.longitude) {
          const hotelLat = parseFloat(hotel.latitude);
          const hotelLon = parseFloat(hotel.longitude);

          const dist = getDistance(userLat, userLon, hotelLat, hotelLon);
          setDistance(dist.toFixed(2)); // Round to 2 decimal places
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, [hotel.latitude, hotel.longitude]);

  const navigateToHotel = (id) => {
    navigate('/HotelDetails?propertyid=' + id);
  };

  return (
    <div
      className="container mx-auto flex flex-col md:flex-row p-4 cursor-pointer border-b border-gray-200"
      onClick={() => navigateToHotel(hotel.id)}
    >
      {/* Replace image with vendor's image, if available */}
      <img
        src={hotel.image || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200'}  // You can add a default image path here
        alt={hotel.servicename}
        className="w-full md:w-32 h-24 object-cover rounded-md"
      />
      <div className="ml-0 md:ml-4 flex-grow text-center md:text-left">
        <h2 className="font-bold text-lg">{hotel.servicename}</h2>
        <p className="text-gray-500 text-sm md:text-base">{hotel.address}</p>
        <div className="flex justify-center md:justify-start items-center text-yellow-500">
          <span className="font-bold">{hotel.rating || 'N/A'}</span>
          <span className="ml-2 text-gray-500">({hotel.reviews || '5'} Reviews)</span>
        </div>
        <p className="mt-2 text-green-600">{hotel.cancellationPolicy || 'N/A'}</p>

        {/* Show Distance */}
        {distance && (
          <p className="mt-2 text-gray-600 font-semibold">
            📍{distance} km away
          </p>
        )}
      </div>
      <div className="text-center md:text-right mt-4 md:mt-0">
        <p className="text-lg font-bold text-red-500">₹{hotel.price || 'N/A'}</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Select Rooms
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
