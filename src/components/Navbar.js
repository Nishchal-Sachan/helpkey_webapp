import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nearByListings, vedorsByName } from '../redux/actions/vendorAction';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = ({ setCity }) => {
    const dispatch = useDispatch();
    const [location, setLocation] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(1);
    const navigate = useNavigate();

    const searchhotel = () => {
        navigate('/HotelDetails'); // Navigates to the '/about' page
    };

    const handleSearch = () => {
        setCity(location);
        const params ={
            city:location
        }
        dispatch(nearByListings(params));
    };

    return (
        <div className="container mx-auto w-full bg-custom-gradient py-4">
            <div className="flex flex-wrap justify-center items-center space-y-4 md:space-y-0 md:flex-nowrap md:space-x-2">
                {/* Location Input */}
                <div className="flex flex-col w-[300px] md:w-auto items-start px-4 py-2 bg-custompurple rounded-md">
                    <label className="text-s font-medium text-white">LOCATION</label>
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-transparent text-white placeholder-white focus:outline-none mt-1 w-full"
                    />
                </div>

                {/* Check-In Input */}
                <div className="flex flex-col w-[300px] md:w-auto items-start px-4 py-2 bg-custompurple rounded-md">
                    <label className="text-s font-medium text-white">CHECK IN</label>
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="bg-transparent text-white focus:outline-none mt-1 w-full"
                    />
                </div>

                {/* Check-Out Input */}
                <div className="flex flex-col w-[300px] md:w-auto items-start px-4 py-2 bg-custompurple rounded-md">
                    <label className="text-s font-medium text-white">CHECK OUT</label>
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="bg-transparent text-white focus:outline-none mt-1 w-full"
                    />
                </div>

                {/* Guests Dropdown */}
                <div className="flex flex-col w-[300px] md:w-auto items-start px-4 py-2 bg-custompurple rounded-md">
                    <label className="text-s font-medium text-white">GUESTS</label>
                    <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="bg-transparent text-white focus:outline-none mt-1 w-full"
                    >
                        {[...Array(10).keys()].map((guest) => (
                            <option key={guest + 1} value={guest + 1} className="text-black">
                                {guest + 1} Guest{guest > 0 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Search Button */}
                <button
                    onClick={() => {
                        handleSearch();
                    }}
                    className="w-[300px] md:w-auto px-6 lg:py-5 py-2 bg-custompurple border border-white text-s font-medium text-white rounded-md hover:bg-[#39446C]"
                >
                    Search
                </button>
            </div>
        </div>

    );
};

export default Navbar;
