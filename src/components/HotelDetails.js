import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Wifi, Star, Utensils, Sparkles, Calendar } from 'lucide-react';
import { useImageGallery } from '../hooks/useImageGallery';
import axios from 'axios';

const AmenityItem = ({ icon, label }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>{label}</span>
  </div>
);

const DateDisplay = ({ date }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <Calendar className="w-4 h-4" /> {date}
  </div>
);

const HotelDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const propertyid = searchParams.get('propertyid');
  const { currentImageIndex, nextImage, prevImage } = useImageGallery(1);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [availableRooms, setAvailableRooms] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [guests, setGuests] = useState(searchParams.get('guests') || '1 Adult');
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkInDate, setCheckInDate] = useState(
    searchParams.get('checkin') || today.toISOString().split('T')[0]
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchParams.get('checkout') || tomorrow.toISOString().split('T')[0]
  );

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (propertyid) {
      setLoading(true);
      setError(null);

      axios
        .get(`https://helpkey-backend.onrender.com/api/listings/${propertyid}`)
        .then((response) => {
          const parsed = JSON.parse(response.data.details);
          setSelectedHotel(response.data.listing);
          setAvailableRooms(parsed.number_of_rooms || 1);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load hotel details.');
          setLoading(false);
        });
    }
  }, [propertyid]);

  // Calculate the number of days between check-in and check-out
  const calculateNumberOfDays = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
    return differenceInTime / (1000 * 3600 * 24); // Convert time difference to days
  };

  // Update the total price based on the number of rooms and number of days
  useEffect(() => {
    if (selectedHotel) {
      const pricePerRoom = selectedHotel.price || 9;
      const numberOfDays = calculateNumberOfDays(checkInDate, checkOutDate);
      const newTotalPrice = pricePerRoom * roomCount * numberOfDays;
      setTotalPrice(newTotalPrice);
    }
  }, [roomCount, guests, selectedHotel, checkInDate, checkOutDate]);

  const getNumberOfAdults = (guestString) => {
    const match = guestString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  };

  const updateSearch = () => {
    const maxGuestsPerRoom = 3;
    const totalGuests = getNumberOfAdults(guests);

    if (roomCount < Math.ceil(totalGuests / maxGuestsPerRoom)) {
      alert('Please increase the number of rooms as the maximum number of guests in a room is 3.');
      return;
    }

    setUpdating(true);
    setTimeout(() => {
      setSearchParams({
        propertyid,
        checkin: checkInDate,
        checkout: checkOutDate,
        guests,
        rooms: roomCount,
      });
      setUpdating(false);
    }, 1000);
  };

  if (loading) return <p>Loading hotel details...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedHotel) return <p>No hotel found for this ID.</p>;

  return (
    <>
      <div className="container mx-auto">
        <div className="p-4 text-sm text-gray-600">
          All Hotels &gt; Hotels in {selectedHotel.location.city} &gt; {selectedHotel.title}
        </div>

        {/* Hotel Name, City, Rating, Reviews */}
        <div className="px-4 py-2 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{selectedHotel.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-600">{selectedHotel.location.city}</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">Couple Friendly</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              Check-in: {checkInDate} | Check-out: {checkOutDate} | {guests}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-blue-900 text-white px-3 py-1 rounded-lg text-xl">
              {selectedHotel.rating}
            </div>
            <div className="text-blue-600 mt-1">
              {selectedHotel.reviews} Reviews
            </div>
          </div>
        </div>

        {/* Hotel Image Gallery */}
        <div className="relative mt-4">
          <div className="relative h-[400px] overflow-hidden">
            {selectedHotel.images && selectedHotel.images.length > 0 ? (
              <img
                src={selectedHotel.images[currentImageIndex]}
                alt="Hotel"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200"
                alt="Default Hotel"
                className="w-full h-full object-cover"
              />
            )}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            {selectedHotel.images && selectedHotel.images.length > 0 && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded">
                {currentImageIndex + 1}/{selectedHotel.images.length}
              </div>
            )}
          </div>
        </div>

        {/* Change Dates and Guests Section */}
        <div className="bg-gray-100 p-4 rounded-lg mt-10 mx-4 sm:mx-6">
          <div className="mb-4 sm:mb-0">
            <h2 className="font-semibold text-base sm:text-lg">Change Dates and Guest(s)</h2>
            <p className="text-sm text-gray-600">Check-in: 2 PM | Check-out: 12 PM</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                className="border p-2 rounded-md w-full sm:w-auto"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
              <input
                type="date"
                className="border p-2 rounded-md w-full sm:w-auto"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
              <select
                className="border p-2 rounded-md w-full sm:w-auto"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                {[...Array(availableRooms * 3)].map((_, i) => (
                  <option key={i}>{i + 1} Adult{i > 0 ? 's' : ''}</option>
                ))}
              </select>
              <select
                className="border p-2 rounded-md w-full sm:w-auto"
                value={roomCount}
                onChange={(e) => setRoomCount(Number(e.target.value))}
              >
                {[...Array(availableRooms)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} Room{i > 0 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={updateSearch}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>

        {/* Amenities Section */}
        {selectedHotel.amenities && (
          <div className="mt-8">
            <h2 className="font-semibold text-lg">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {selectedHotel.amenities.map((amenity, index) => (
                <AmenityItem
                  key={index}
                  icon={
                    amenity === 'wifi' ? (
                      <Wifi className="w-5 h-5 text-blue-600" />
                    ) : amenity === 'star' ? (
                      <Star className="w-5 h-5 text-blue-600" />
                    ) : amenity === 'sparkles' ? (
                      <Sparkles className="w-5 h-5 text-blue-600" />
                    ) : (
                      <span className="w-5 h-5 text-blue-600" />
                    )
                  }
                  label={amenity}
                />
              ))}
            </div>
          </div>
        )}

        {/* Price Section */}
        <div className="lg:col-span-1 bg-white rounded-lg p-6 border">
          <div className="text-lg font-semibold mb-3">Price for {roomCount} Room(s)</div>
          <div className="text-2xl font-bold">${totalPrice}</div>
          <div className="mt-4">
            <button
              onClick={() =>
                navigate(`/bookingpage?propertyid=${propertyid}&checkin=${checkInDate}&checkout=${checkOutDate}&guests=${guests}&rooms=${roomCount}&price=${totalPrice}`)
              }
              className="bg-blue-500 text-white py-3 px-6 rounded-md w-full"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetails;
