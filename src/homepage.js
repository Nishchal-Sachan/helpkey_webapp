import './App.css'; // Import custom CSS
import './index.css'; // Import Tailwind CSS
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar';
import HotelList from './components/HotelList';
import Footer from './components/Footer';
import { Amenities } from './components/Amenities';
import { BookingCard } from './components/Bookingcard';
// import { Breadcrumb } from './components/Breadcrumb';
import { HotelHeader } from './components/HotelHeader';
import { ImageGallery } from './components/ImageGallery';

const HomePage = () => {

  const [queryString, setQueryString] = useState(window.location.search);

  // Create a URLSearchParams object
  const urlParams = new URLSearchParams(queryString);

  // Retrieve individual query parameters
  const checkin = urlParams.get('checkin');
  const checkout = urlParams.get('checkout');
  const [city, setCity] = useState(urlParams.get('city'));

  const [cityHotels, setCityHotels] = useState([]);
  const hotels = [
    {
      id: 1,
      name: "Helpkey Prime The King's Court",
      city: 'Goa',
      rating: 4.5,
      reviews: 2104,
      amenities: ['Free Wifi', 'LCD TV', '24x7 Security'],
      cancellationPolicy: 'Free Cancellation',
      price: 3740,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Helpkey Prime Sarala Crown',
      city: 'Goa',
      rating: 4.7,
      reviews: 1736,
      amenities: ['Free Wifi', 'Couple Friendly'],
      cancellationPolicy: 'Free Cancellation, Couple Friendly',
      price: 5400,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Helpkey kanpur Sarala Crown',
      city: 'Kanpur',
      rating: 4.7,
      reviews: 1736,
      amenities: ['Free Wifi', 'Couple Friendly'],
      cancellationPolicy: 'Free Cancellation, Couple Friendly',
      price: 5400,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Helpkey kanpur Sarala Crown',
      city: 'Kanpur',
      rating: 4.7,
      reviews: 1736,
      amenities: ['Free Wifi', 'Couple Friendly'],
      cancellationPolicy: 'Free Cancellation, Couple Friendly',
      price: 5400,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      name: 'Helpkey lucknow Sarala Crown',
      city: 'Lucknow',
      rating: 4.7,
      reviews: 1736,
      amenities: ['Free Wifi', 'Couple Friendly'],
      cancellationPolicy: 'Free Cancellation, Couple Friendly',
      price: 5400,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 7,
      name: 'Helpkey jaipur Sarala Crown',
      city: 'jaipur',
      rating: 4.7,
      reviews: 1736,
      amenities: ['Free Wifi', 'Couple Friendly'],
      cancellationPolicy: 'Free Cancellation, Couple Friendly',
      price: 5400,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 9,
      name: 'Helpkey jaipur Sarala Crown',
      city: 'jaipur',
      rating: 4.7,
      reviews: 1736,
      amenities: ['Free Wifi', 'Couple Friendly'],
      cancellationPolicy: 'Free Cancellation, Couple Friendly',
      price: 5400,
      image: 'https://via.placeholder.com/150',
    }
  ]

  useEffect(() => {
    setCityHotels(hotels.filter(x => x.city?.toLowerCase() == city?.toLowerCase()));
  }, [city]);

  // Function to handle filter changes
  const handleFilterChange = (filters) => {
    console.log('Filters:', filters);
    // Implement filter logic here. For now, it's just logging filters.
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <Header />

      {/* Navbar */}
      <Navbar setCity={setCity} />

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        {/* Left Filter Sidebar */}
        <div className="col-span-1 md:col-span-3">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {/* Right Hotel List */}
        <div className="col-span-1 md:col-span-9">
          <HotelList hotels={cityHotels} />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
