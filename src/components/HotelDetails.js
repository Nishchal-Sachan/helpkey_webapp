// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Wifi, Star, Utensils, Sparkles, Calendar } from 'lucide-react';
// import { useImageGallery } from '../hooks/useImageGallery'; // assuming this hook is working
// import axios from "axios";

// const HotelDetails = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const propertyid = searchParams.get('propertyid');
//   const { currentImageIndex, nextImage, prevImage } = useImageGallery(1);
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updating, setUpdating] = useState(false);
//   const navigate = useNavigate();

//   // Function to format date as "Mon, 25 March 2025"
//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-GB', {
//       weekday: 'short',
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   // Get today's date and tomorrow's date
//   const today = new Date();
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   const [checkInDate, setCheckInDate] = useState(searchParams.get("checkin") || today.toISOString().split("T")[0]);
//   const [checkOutDate, setCheckOutDate] = useState(searchParams.get("checkout") || tomorrow.toISOString().split("T")[0]);
//   const [guests, setGuests] = useState(searchParams.get("guests") || "1 Adult");

//   useEffect(() => {
//     if (propertyid) {
//       setLoading(true);
//       setError(null);
//       axios.get(`https://helpkeyapi.onrender.com/api/vendor-by-id`, { params: { id: propertyid } })
//         .then((response) => {
//           setSelectedHotel(response.data);
//           console.log(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           setError('Failed to load hotel details.');
//           setLoading(false);
//         });
//     }
//   }, [propertyid]);

//   const updateSearch = () => {
//     setUpdating(true);
//     setTimeout(() => {
//       setSearchParams({ propertyid, checkin: checkInDate, checkout: checkOutDate, guests });
//       setUpdating(false);
//     }, 1000);
//   };

//   if (loading) {
//     return <p>Loading hotel details...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!selectedHotel) {
//     return <p>No hotel found for this ID.</p>;
//   }

//   return (
//     <>
//       <div className='container mx-auto'>
//         <div className="p-4 text-sm text-gray-600">
//           All Hotels &gt; Hotels in {selectedHotel.city} &gt; {selectedHotel.vendors[0]?.servicename}
//         </div>

//         {/* Hotel Name, City, Rating, Reviews */}
//         <div className="px-4 py-2 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-semibold">{selectedHotel.vendors[0]?.servicename}</h1>
//             <div className="flex items-center gap-2 mt-1">
//               <span className="text-gray-600">{selectedHotel.city}</span>
//               <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">Couple Friendly</span>
//             </div>
//             <p className="text-gray-600 text-sm mt-1">Check-in: {checkInDate} | Check-out: {checkOutDate} | {guests}</p>
//           </div>
//           <div className="text-right">
//             <div className="bg-blue-900 text-white px-3 py-1 rounded-lg text-xl">{selectedHotel.rating}</div>
//             <div className="text-blue-600 mt-1">{selectedHotel.reviews} Reviews</div>
//           </div>
//         </div>

//         {/* Hotel Image Gallery */}
//         <div className="relative mt-4">
//           <div className="relative h-[400px] overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200"
//               alt="Hotel"
//               className="w-full h-full object-cover"
//             />
//             <button
//               onClick={prevImage}
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
//             <button
//               onClick={nextImage}
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>
//             {selectedHotel.images && Array.isArray(selectedHotel.images) && selectedHotel.images.length > 0 && (
//               <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded">
//                 {currentImageIndex + 1}/{selectedHotel.images.length}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Change Dates and Guests Section */}
//         <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mt-10 mx-6">
//           <div>
//             <h2 className="font-semibold">Change Dates and Guest(s)</h2>
//             <p className="text-sm text-gray-600">Check-in: 2 PM | Check-out: 12 PM</p>
//           </div>
//           <div className="flex gap-2">
//             <input type="date" className="border p-2 rounded-md" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
//             <input type="date" className="border p-2 rounded-md" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
//             <select className="border p-2 rounded-md" value={guests} onChange={(e) => setGuests(e.target.value)}>
//               <option>1 Adult</option>
//               <option>2 Adults</option>
//               <option>3 Adults</option>
//               <option>4 Adults</option>
//               <option>5 Adults</option>
//               <option>6 Adults</option>
//               <option>7 Adults</option>
//               <option>8 Adults</option>
//               <option>9 Adults</option>
//               <option>10 Adults</option>
//             </select>
//             <button onClick={updateSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold">
//               {updating ? "Updating..." : "UPDATE SEARCH"}
//             </button>
//           </div>
//         </div>

//         {/* Hotel Amenities */}
//         <div className="grid md:grid-cols-3 gap-8 p-6">
//           <div className="md:col-span-2">
//             {/* Render amenities only if available */}
//             {selectedHotel.amenities && Array.isArray(selectedHotel.amenities) && selectedHotel.amenities.length > 0 && (
//               <div className="flex gap-4 mb-6">
//                 {selectedHotel.amenities.map((amenity, index) => (
//                   <div key={index} className="bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2">
//                     <span className="text-green-600">✓</span>
//                     <span>{amenity}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="grid grid-cols-4 gap-4 mt-8">
//               <AmenityItem icon={<Wifi className="w-6 h-6" />} label="High Speed Wifi" />
//               <AmenityItem icon={<Star className="w-6 h-6" />} label="Well-equipped Rooms" />
//               <AmenityItem icon={<Utensils className="w-6 h-6" />} label="Healthy Food" />
//               <AmenityItem icon={<Sparkles className="w-6 h-6" />} label="100% Hygiene" />
//             </div>
//           </div>



//           {/* Booking Card */}
//           {/* Fabulous Section */}
//           <div className="bg-gray-50 p-6 rounded-lg mt-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold">Fabulous</h3>
//               <div className="text-green-600 text-sm">
//                 <div>92% guests rated 4+</div>
//                 <div>99% guests recommend</div>
//               </div>
//             </div>

//             <div className="flex gap-4 mb-4">
//               <DateDisplay date={formatDate(checkInDate)} />
//               <DateDisplay date={formatDate(checkOutDate)} />
//             </div>

//             <div className="border-t pt-4">
//               <div className="flex justify-between items-center mb-4">
//                 <div>1 × Deluxe Room for {guests}</div>
//                 <div className="text-xl font-semibold">₹{selectedHotel.price}</div>
//               </div>
//               <button className="w-full bg-yellow-400 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
//                 onClick={() => navigate("/bookingpage?propertyid=" + propertyid)}
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div >


//     </>
//   );
// };

// export default HotelDetails;

// function AmenityItem({ icon, label }) {
//   return (
//     <div className="flex flex-col items-center gap-2">
//       <div className="text-gray-700">{icon}</div>
//       <span className="text-sm text-center">{label}</span>
//     </div>
//   );
// }

// function DateDisplay({ date }) {
//   return (
//     <div className="flex-1">
//       <div className="flex items-center gap-2">
//         <Calendar className="w-4 h-4" />
//         <span>{(date)}</span>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Wifi, Star, Utensils, Sparkles, Calendar } from 'lucide-react';
import { useImageGallery } from '../hooks/useImageGallery'; // assuming this hook is working
import axios from 'axios';

const HotelDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const propertyid = searchParams.get('propertyid');
  const { currentImageIndex, nextImage, prevImage } = useImageGallery(1);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
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

      // API call to fetch listing by ID
      axios
        .get(`https://helpkey-backend.vercel.app/api/listings/${propertyid}`)
        .then((response) => {
          setSelectedHotel(response.data.data); // assuming the response structure is { data: <hotelDetails> }
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to load hotel details.');
          setLoading(false);
        });
    }
  }, [propertyid]);

  const getNumberOfAdults = (guestString) => {
    const match = guestString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  };

  const updateSearch = () => {
    setUpdating(true);
    setTimeout(() => {
      setSearchParams({ propertyid, checkin: checkInDate, checkout: checkOutDate, guests });
      setUpdating(false);
    }, 1000);
  };

  if (loading) {
    return <p>Loading hotel details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!selectedHotel) {
    return <p>No hotel found for this ID.</p>;
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="p-4 text-sm text-gray-600">
          All Hotels &gt; Hotels in {selectedHotel.location.city} &gt;{' '}
          {selectedHotel.title}
        </div>

        {/* Hotel Name, City, Rating, Reviews */}
        <div className="px-4 py-2 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{selectedHotel.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-600">{selectedHotel.location.city}</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                Couple Friendly
              </span>
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
                {[...Array(10)].map((_, i) => (
                  <option key={i}>{i + 1} Adult{i > 0 ? 's' : ''}</option>
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


        {/* Hotel Amenities */}
        {/* <div className="grid md:grid-cols-3 gap-8 p-6">
          <div className="md:col-span-2">
            {selectedHotel.amenities &&
              selectedHotel.amenities.length > 0 && (
                <div className="flex gap-4 mb-6">
                  {selectedHotel.amenities.map((amenity, index) => (
                    <div key={index} className="bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              )}

            <div className="grid grid-cols-4 gap-4 mt-8">
              <AmenityItem icon={<Wifi className="w-6 h-6" />} label="High Speed Wifi" />
              <AmenityItem icon={<Star className="w-6 h-6" />} label="Well-equipped Rooms" />
              <AmenityItem icon={<Utensils className="w-6 h-6" />} label="Healthy Food" />
              <AmenityItem icon={<Sparkles className="w-6 h-6" />} label="100% Hygiene" />
            </div>
          </div> */}

        <div className="grid md:grid-cols-3 gap-8 p-6">
          <div className="md:col-span-2">
            {/* Render amenities from the backend */}
            {/* {selectedHotel.amenities && selectedHotel.amenities.length > 0 && (
      <div className="flex gap-4 mb-6">
        {selectedHotel.amenities.map((amenity, index) => (
          <div key={index} className="bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    )} */}

            {/* Static amenities (if you want to keep them) */}
            <div className="grid grid-cols-4 gap-4 mt-8">
              <AmenityItem icon={<Wifi className="w-6 h-6" />} label="High Speed Wifi" />
              <AmenityItem icon={<Star className="w-6 h-6" />} label="Well-equipped Rooms" />
              <AmenityItem icon={<Utensils className="w-6 h-6" />} label="Healthy Food" />
              <AmenityItem icon={<Sparkles className="w-6 h-6" />} label="100% Hygiene" />
            </div>
          </div>



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
                <div>1 × Deluxe Room for {getNumberOfAdults(guests)} Adult(s)</div>

                <div className="text-xl font-semibold">
                  ₹{selectedHotel.price * getNumberOfAdults(guests)}
                </div>

              </div>
              <button
                className="w-full bg-yellow-400 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                onClick={() => navigate(`/bookingpage?propertyid=${propertyid}`)}
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

function AmenityItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-gray-700">{icon}</div>
      <span className="text-sm text-center">{label}</span>
    </div>
  );
}

function DateDisplay({ date }) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>{date}</span>
      </div>
    </div>
  );
}
