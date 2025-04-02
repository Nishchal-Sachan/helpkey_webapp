import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNearbyVendors } from '../redux/slices/vendorsSlice';

const NearbyHotels = () => {
    const dispatch = useDispatch();
    const { vendors, isLoading, error } = useSelector((state) => state.vendorsAuto);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(fetchNearbyVendors({ latitude, longitude }));
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    alert('Please enable location access to find nearby vendors.');
                });
        }
    }, [dispatch]);



    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Nearby Hotels</h2>

            {isLoading && <p className="text-lg text-gray-500">Loading...</p>}
            {error && <p className="text-lg text-red-500">Error: {error}</p>}

            <ul className="list-decimal pl-6">
                {vendors.length > 0 ? (
                    vendors.map((vendor) => (
                        <><br />
                            <li key={vendor.id} className="text-lg text-gray-800">
                                <span className='font-bold'>Hotel Name:</span> {vendor.servicename}<br />
                                <span className='font-bold'>Address: </span>{vendor.address}<br />
                                <span className='font-bold'>Email: </span>{vendor.email}  {/* Add fallback */}
                            </li>
                        </>
                    ))
                ) : (
                    !isLoading && !error && (
                        <li className="text-lg text-gray-500">No vendors found for your location.</li>
                    )
                )}
            </ul>
        </div>
    );
};

export default NearbyHotels;
