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
  const [guests, setGuests] = useState(searchParams.get('guests') || '1 Adult');

  useEffect(() => {
    if (propertyid) {
      setLoading(true);
      setError(null);

      axios
        .get(`https://helpkey-backend.onrender.com/api/listings/${propertyid}`)
        .then((response) => {
          const parsed = JSON.parse(response.data.details);
          console.log("response",parsed);
          setSelectedHotel(response.data.listing);
          setAvailableRooms(parsed.number_of_rooms || 1);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError('Failed to load hotel details.');
          setLoading(false);
        });
    }
  }, [propertyid]);

  const updateSearch = () => {
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

  const getNumberOfAdults = (guestString) => {
    const match = guestString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
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
        {/* <div className="relative mt-4">
          <div className="relative h-[400px] overflow-hidden">
            {selectedHotel.images &&
              selectedHotel.images.length > 0 && (
                <img
                  src={selectedHotel.images[currentImageIndex]}
                  alt="Hotel"
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
        </div> */}

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
            {selectedHotel.images && selectedHotel.images.length > 0 ? (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded">
                {currentImageIndex + 1}/{selectedHotel.images.length}
              </div>
            ) : (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded">
                1/1
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
                {[...Array(selectedHotel.guests || 10)].map((_, i) => (
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
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold w-full sm:w-auto"
            >
              {updating ? 'Updating...' : 'UPDATE SEARCH'}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 p-6">
          {/* Amenities Section */}
          {selectedHotel.amenities && selectedHotel.amenities.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
              {selectedHotel.amenities.map((item, idx) => (
                <AmenityItem
                  key={idx}
                  icon={<Sparkles className="w-5 h-5 text-blue-600" />} // You can map icons dynamically too
                  label={item.charAt(0).toUpperCase() + item.slice(1)}
                />
              ))}
            </div>
          )}


          {/* Booking Card */}
          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Fabulous</h3>
              <div className="text-green-600 text-sm">
                <div>92% guests rated 4+</div>
                <div>99% guests recommend</div>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <DateDisplay date={formatDate(checkInDate)} />
              <DateDisplay date={formatDate(checkOutDate)} />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <div>{roomCount} × Deluxe Room for {getNumberOfAdults(guests)} Adult(s)</div>
                <div className="text-xl font-semibold">
                  ₹{selectedHotel.price * roomCount}
                </div>
              </div>
              <button
                className="w-full bg-yellow-400 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                onClick={() =>
                  navigate(
                    `/bookingpage?propertyid=${propertyid}&checkin=${checkInDate}&checkout=${checkOutDate}&guests=${guests}&rooms=${roomCount}&price=${selectedHotel.price * roomCount}`
                  )
                }
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetails;
