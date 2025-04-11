import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMakePayment } from './razorpay/buyProduct.js';

const BookingPage = () => {
    const makePayment = useMakePayment();
    console.log("typeof makePayment:", typeof makePayment); // should be "function"

    const [searchParams] = useSearchParams();
    const propertyid = searchParams.get('propertyid');
    const [hotel, setHotel] = useState(null);
    const [secureTrip, setSecureTrip] = useState(null);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState(4299);
    const [taxes, setTaxes] = useState(464);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Corrected navigation import
    const [guestDetails, setGuestDetails] = useState([
        {
            title: "Mr",
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
        },
    ]);
    const [checkInDate, setCheckInDate] = useState('');  // Added state for check-in date
    const [checkOutDate, setCheckOutDate] = useState('');  // Added state for check-out date

    useEffect(() => {
        if (propertyid) {
            setLoading(true);
            setError(null);

            // API call to fetch listing by ID
            axios
                .get(`https://helpkey-backend.onrender.com/api/listings/${propertyid}`)
                .then((response) => {
                    setHotel(response.data.data);  // Updated to setHotel
                    setLoading(false);
                })
                .catch((error) => {
                    setError('Failed to load hotel details.');
                    setLoading(false);
                });
        }
    }, [propertyid]);

    const handleBooking = async () => {
        try {
          const paymentHandler = async (paymentDetails) => {
            try {
              const bookingData = {
                hotel_id: propertyid,
                guest_name: guestDetails[0].firstName + " " + guestDetails[0].lastName,
                check_in: checkInDate,
                check_out: checkOutDate,
                total_price: price - discount + taxes,
                payment_id: paymentDetails.razorpay_payment_id,
              };
      
              const response = await axios.post("https://helpkey-backend.onrender.com/api/bookings", bookingData);
      
              if (response.data.success) {
                alert("Booking successful!");
                navigate(`/success?bookingid=${response.data.bookingId}`);
              } else {
                alert("Booking failed! Please try again.");
              }
            } catch (error) {
              console.error("Booking error after payment:", error);
              alert("An error occurred while saving the booking.");
            }
          };
      
          await makePayment({
            productId: propertyid,
            onSuccess: paymentHandler,
            navigate, // 👈 pass navigate manually
          });
        } catch (error) {
          console.error("Error during booking/payment:", error);
          alert("Something went wrong during payment.");
        }
      };
    
    
    // Available Coupons List
    const availableCoupons = [
        { code: "HKHSBCEMI", discount: 580, description: "₹580 off on HDFC Credit Card EMI" },
        { code: "HKSBIEMI", discount: 464, description: "₹464 off on SBI Credit Card EMI" },
        { code: "WELCOME10", discount: 500, description: "10% off for first-time users" },
    ];

    // Apply Coupon Function
    const applyCoupon = () => {
        const selectedCoupon = availableCoupons.find((c) => c.code === coupon);
        if (selectedCoupon) {
            setDiscount(selectedCoupon.discount);
        } else {
            setDiscount(0);
            alert("Invalid Coupon Code");
        }
    };

    const addGuest = () => {
        setGuestDetails([
            ...guestDetails,
            { title: "Mr", firstName: "", lastName: "", email: "", mobile: "" },
        ]);
    };

    // Function to remove a guest
    const removeGuest = (index) => {
        if (guestDetails.length > 1) {
            setGuestDetails(guestDetails.filter((_, i) => i !== index));
        } else {
            alert("At least one guest is required.");
        }
    };

    const handleGuestChange = (index, field, value) => {
        const updatedGuests = [...guestDetails];
        updatedGuests[index][field] = value;
        setGuestDetails(updatedGuests);
    };

    return (
        <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
            {/* Left Section - Booking Details */}
            <div className="md:w-2/3 space-y-6">
                {/* Booking Review Card */}
                <div className="bg-white shadow-odd rounded-lg p-6">
                    <h1 className="text-2xl font-bold">Review Your Booking</h1>
                    <p className="text-gray-600">{loading ? "Loading..." : hotel?.servicename || "Hotel Name Not Available"}
                    </p>

                    <div className="flex justify-between items-center border-t pt-4 mt-4">
                        <div>
                            <p className="font-semibold">1 × Luxe Twin Room</p>
                            <p className="text-gray-500">1 Night | 1 Adult | No meals</p>
                            <ul className="text-gray-600 text-sm mt-2">
                                <li>Room Only, No meals included</li>
                                <li>Early check-in up to 2 hrs</li>
                                <li>20% off on food & beverage services</li>
                            </ul>
                        </div>
                        <p className="text-xl font-semibold">₹{price}</p>
                    </div>
                    <div className="border-t pt-4 mt-4">
                        <h2 className="font-semibold text-lg">Upgrade Your Stay</h2>
                        <div className="flex flex-col gap-2 mt-2">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="meal" className="accent-blue-500" />
                                <span>Add Breakfast for ₹303</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="meal" className="accent-blue-500" />
                                <span>Add Breakfast + Lunch/Dinner for ₹530</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Important Information Card */}
                <div className="bg-white shadow-odd rounded-lg p-6">
                    <h2 className="text-xl font-bold">Important Information</h2>
                    <ul className="list-disc pl-5 text-gray-700 mt-2">
                        <li>Passport, Aadhar, Driving License, and Govt. ID are accepted.</li>
                        <li>Pets are not allowed.</li>
                        <li>Smoking within the premises is not allowed.</li>
                        <li>Special cancellation policies apply to group bookings.</li>
                    </ul>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 text-blue-600 font-semibold underline"
                    >
                        View More
                    </button>
                </div>

                {/*Modal*/}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-odd max-w-md w-full">
                            <h2 className="text-xl font-bold">Important Information</h2>
                            <p className="mt-2 text-gray-700">
                                - Government ID is mandatory for check-in.<br />
                                - Early check-in & late check-out are subject to availability.<br />
                                - Any damages to hotel property will be chargeable.<br />
                                - Refund policies apply as per hotel regulations.<br />
                            </p>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/*Guest Details*/}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-bold">Guest Details</h2>

                    {/* Myself or Someone Else */}
                    <div className="mt-4">
                        <label className="p-2">
                            <input
                                type="radio"
                                name="guestdetail"
                                onChange={() => setSecureTrip(true)}
                            />{" "}
                            Myself
                        </label>
                        <label className="p-2">
                            <input
                                type="radio"
                                name="guestdetail"
                                onChange={() => setSecureTrip(false)}
                            />{" "}
                            Someone Else
                        </label>
                    </div>

                    {/* Guest Information Form */}
                    {guestDetails.map((guest, index) => (
                        <div key={index} className="mt-6 border-b pb-4 relative">
                            <div className="flex">
                                <h3 className="text-lg font-semibold">Guest {index + 1}</h3>

                                {/* Remove Guest Button */}
                                {guestDetails.length > 1 && (
                                    <button
                                        onClick={() => removeGuest(index)}
                                        className="py-1 rounded text-md ml-auto"
                                    >
                                        ✕ Remove
                                    </button>
                                )}
                            </div>

                            <div className="mt-4 flex gap-4">
                                <div className="w-1/4">
                                    <label className="text-sm font-medium">Title</label>
                                    <select
                                        className="border p-2 rounded w-full"
                                        value={guestDetails.title}
                                        onChange={(e) =>
                                            handleGuestChange(index, "title", e.target.value)
                                        }
                                    >
                                        <option>Mr</option>
                                        <option>Mrs</option>
                                        <option>Ms</option>
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <input
                                        type="text"
                                        className="border p-2 rounded w-full"
                                        placeholder="First Name"
                                        value={guestDetails.firstName}
                                        onChange={(e) =>
                                            handleGuestChange(index, "firstName", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <input
                                        type="text"
                                        className="border p-2 rounded w-full"
                                        placeholder="Last Name"
                                        value={guestDetails.lastName}
                                        onChange={(e) =>
                                            handleGuestChange(index, "lastName", e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium">Email Address</label>
                                <input
                                    type="email"
                                    className="border p-2 rounded w-full"
                                    placeholder="Email Address"
                                    value={guestDetails.email}
                                    onChange={(e) =>
                                        handleGuestChange(index, "email", e.target.value)
                                    }
                                />
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium">Mobile Number</label>
                                <input
                                    type="tel"
                                    className="border p-2 rounded w-full"
                                    placeholder="Mobile Number"
                                    value={guestDetails.mobile}
                                    onChange={(e) =>
                                        handleGuestChange(index, "mobile", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    {/* Add More Guest Button */}
                    <button
                        onClick={addGuest}
                        className="mt-4 bg-blue-500 text-white w-44 p-2 rounded font-semibold hover:bg-blue-600"
                    >
                        + Add More Guest
                    </button>
                </div>


                {/* Trip Secure Card */}
                <div className="bg-white shadow-odd rounded-lg p-6">
                    <h2 className="text-xl font-bold">Trip Secure</h2>
                    <p className="text-gray-700">Enjoy a Worry-Free Stay</p>
                    <div className="mt-4 bg-blue-100 p-4 rounded">
                        <p className="font-semibold">Loss of Laptop/Tablet - ₹25,000</p>
                        <p>Medical Assistance - 24*7 SUPPORT</p>
                        <p>Refund on Hotel Cancellation - ₹15,000</p>
                        <p>Personal Accident - ₹10,00,000</p>
                    </div>
                    <div className="mt-4">
                        <label className="block border p-2 rounded cursor-pointer">
                            <input type="radio" name="tripSecure" onChange={() => setSecureTrip(true)} /> Yes, secure my trip.
                        </label>
                        <label className="block border p-2 rounded cursor-pointer mt-2">
                            <input type="radio" name="tripSecure" onChange={() => setSecureTrip(false)} /> No, I will book without trip secure.
                        </label>
                    </div>
                </div>

                {/* Book Now Button */}
                <div className="bg-white shadow-odd rounded-lg p-6">
                    <button className="w-56 bg-yellow-400 py-3 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
                        onClick={handleBooking}
                    >
                        Pay Now
                    </button>
                </div>
            </div>

            {/* Right Section - Price Breakup & Coupon Code */}
            <div className="md:w-1/3 space-y-6">
                {/* Price Breakup Card */}
                <div className="bg-white shadow-odd rounded-lg p-6">
                    <h2 className="font-semibold text-lg">Price Breakup</h2>
                    <div className="flex justify-between mt-2">
                        <p>Room Price</p>
                        <p>₹{price}</p>
                    </div>
                    <div className="flex justify-between mt-2 text-green-500">
                        <p>Discount</p>
                        <p>- ₹{discount}</p>
                    </div>
                    <div className="flex justify-between mt-2">
                        <p>Hotel Taxes</p>
                        <p>₹{taxes}</p>
                    </div>
                    <div className="flex justify-between mt-2 font-semibold border-t pt-2">
                        <p>Total Amount</p>
                        <p>₹{price - discount + taxes}</p>
                    </div>
                </div>

                {/* Coupon Code Card */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="font-semibold text-lg">Coupon Codes</h2>

                    {/* Available Coupons List */}
                    <div className="mt-2 bg-gray-100 p-3 rounded-lg">
                        <h3 className="text-sm font-bold text-gray-700">Available Coupons</h3>
                        {availableCoupons.map((couponItem, index) => (
                            <button
                                key={index}
                                onClick={() => setCoupon(couponItem.code)}
                                className="block w-full text-left bg-white p-2 rounded mt-2 hover:bg-gray-200 transition"
                            >
                                <p className="font-semibold text-blue-600">{couponItem.code}</p>
                                <p className="text-sm text-gray-500">{couponItem.description}</p>
                            </button>
                        ))}
                    </div>

                    {/* Coupon Input Field */}
                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            className="border p-2 rounded w-full"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                        />
                        <button
                            onClick={applyCoupon}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Apply
                        </button>
                    </div>

                    {/* Discount Applied */}
                    {discount > 0 && (
                        <p className="mt-2 text-green-600 font-semibold">
                            Discount Applied: ₹{discount}
                        </p>
                    )}
                </div>
            </div>
        </div >
    );
};

export default BookingPage;


