// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// //import { fetchNearbyVendors } from '../redux/slices/vendorsSlice';
// import HotelCard from './HotelCard'; // Assuming HotelCard is in the same directory
// import { nearByVendors} from '../redux/actions/vendorAction';

// const HotelList = () => {
//     const dispatch = useDispatch();
//     const { vendors, isHotelLoading, error } = useSelector((state) => state.vendors);

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     const propertyType = 25;
//                     const parameter ={
//                         latitude:latitude,
//                         longitude:longitude,
//                         propertyType:propertyType
//                     }
//                     dispatch(nearByVendors(parameter));
//                 },
//                 (error) => {
//                     console.error('Error fetching location:', error);
//                     alert('Please enable location access to find nearby vendors.');
//                 });
//         }
//     }, [dispatch]);

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-semibold mb-4">Nearby Hotels</h2>

//             {isHotelLoading && <p className="text-lg text-gray-500">Loading...</p>}
//             {error && <p className="text-lg text-red-500">Error: {error}</p>}

//             {vendors.length > 0 ? (
//                 vendors.map((vendor) => (
//                     <HotelCard key={vendor.id} hotel={vendor} />
//                 ))
//             ) : (
//                 !isHotelLoading && !error && (
//                     <p className="text-lg text-gray-500">No vendors found for your location.</p>
//                 )
//             )}
//         </div>
//     );
// };

// export default HotelList;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HotelCard from './HotelCard'; // Assuming HotelCard is in the same directory
import { nearByListings } from '../redux/actions/vendorAction';

const HotelList = () => {
    const dispatch = useDispatch();
    const { listings = [], isHotelLoading, error } = useSelector((state) => state.vendors); // Default empty array for listings

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const propertyType = 25; // Property type should match your requirements
                    const parameter = {
                        latitude: latitude,
                        longitude: longitude,
                        propertyType: propertyType
                    };
                    dispatch(nearByListings(parameter));
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    alert('Please enable location access to find nearby vendors.');
                }
            );
        }
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Nearby Hotels</h2>

            {isHotelLoading && <p className="text-lg text-gray-500">Loading...</p>}
            {error && <p className="text-lg text-red-500">Error: {error}</p>}

            {listings.length > 0 ? (
                listings.map((listing) => (
                    <HotelCard key={listing.id} hotel={listing} />
                ))
            ) : (
                !isHotelLoading && !error && (
                    <p className="text-lg text-gray-500">No vendors found for your location.</p>
                )
            )}
        </div>
    );
};

export default HotelList;
