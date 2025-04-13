import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMakePayment } from './razorpay/buyProduct.js';

const BookingPage = () => {
    const makePayment = useMakePayment();
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
    const navigate = useNavigate();
    const [guestDetails, setGuestDetails] = useState([
        {
            title: "Mr",
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
        },
    ]);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    useEffect(() => {
        if (propertyid) {
            setLoading(true);
            setError(null);

            axios
                .get(`https://helpkey-backend.onrender.com/api/listings/${propertyid}`)
                .then((response) => {
                    setHotel(response.data.data);
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
                navigate,
            });
        } catch (error) {
            console.error("Error during booking/payment:", error);
            alert("Something went wrong during payment.");
        }
    };

    const availableCoupons = [
        { code: "HKHSBCEMI", discount: 580, description: "₹580 off on HDFC Credit Card EMI" },
        { code: "HKSBIEMI", discount: 464, description: "₹464 off on SBI Credit Card EMI" },
        { code: "WELCOME10", discount: 500, description: "10% off for first-time users" },
    ];

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
            <div className="md:w-2/3 space-y-6">
                <div className="bg-white shadow-odd rounded-lg p-6">
                    <h1 className="text-2xl font-bold">Review Your Booking</h1>
                    <p className="text-gray-600">{loading ? "Loading..." : hotel?.servicename || "Hotel Name Not Available"}</p>

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

                <div className="bg-white shadow-odd rounded-lg p-6">
                    <h2 className="text-xl font-bold">Important Information</h2>
                    <ul className="list-disc pl-5 text-gray-700 mt-2">
                        <li>Passport, Aadhar, Driving License, and Govt. ID are accepted.</li>
                        <li>Pets are not allowed.</li>
                        <li>Smoking within the premises is not allowed.</li>
                        <li>Special cancellation policies apply to group bookings.</li>
                    </ul>
                    <button onClick={() => setIsModalOpen(true)} className="mt-4 text-blue-600 font-semibold underline">
                        View More
                    </button>
                </div>

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

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-bold">Guest Details</h2>

                    <div className="mt-4">
                        <label className="p-2">
                            <input type="radio" name="guestdetail" onChange={() => setSecureTrip(true)} /> Myself
                        </label>
                        <label className="p-2">
                            <input type="radio" name="guestdetail" onChange={() => setSecureTrip(false)} /> Someone Else
                        </label>
                    </div>

                    {guestDetails.map((guest, index) => (
                        <div key={index} className="mt-6 border-b pb-4 relative">
                            <div className="flex">
                                <h3 className="text-lg font-semibold">Guest {index + 1}</h3>
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
                                        value={guest.title}
                                        onChange={(e) => handleGuestChange(index, "title", e.target.value)}
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
                                        value={guest.firstName}
                                        onChange={(e) => handleGuestChange(index, "firstName", e.target.value)}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <input
                                        type="text"
                                        className="border p-2 rounded w-full"
                                        placeholder="Last Name"
                                        value={guest.lastName}
                                        onChange={(e) => handleGuestChange(index, "lastName", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium">Email Address</label>
                                <input
                                    type="email"
                                    className="border p-2 rounded w-full"
                                    placeholder="Email Address"
                                    value={guest.email}
                                    onChange={(e) => handleGuestChange(index, "email", e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium">Mobile Number</label>
                                <input
                                    type="tel"
                                    className="border p-2 rounded w-full"
                                    placeholder="Mobile Number"
                                    value={guest.mobile}
                                    onChange={(e) => handleGuestChange(index, "mobile", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}

                    <button onClick={addGuest} className="mt-4 text-blue-600 underline">+ Add Guest</button>
                </div>
            </div>

            {/* Right section - Pricing Summary and Actions can go here */}
            <div className="md:w-1/3 space-y-6">
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-bold mb-4">Price Summary</h2>
    <div className="flex justify-between py-2">
      <span>Base Price</span>
      <span>₹{price}</span>
    </div>
    <div className="flex justify-between py-2">
      <span>Taxes & Fees</span>
      <span>₹{taxes}</span>
    </div>
    {discount > 0 && (
      <div className="flex justify-between py-2 text-green-600 font-semibold">
        <span>Discount</span>
        <span>-₹{discount}</span>
      </div>
    )}
    <hr className="my-3" />
    <div className="flex justify-between font-bold text-lg">
      <span>Total</span>
      <span>₹{price - discount + taxes}</span>
    </div>
    <div className="mt-6">
      <label className="block text-sm font-medium mb-1">Have a Coupon?</label>
      <input
        type="text"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        placeholder="Enter coupon code"
        className="border rounded w-full px-3 py-2 mb-2"
      />
      <button
        onClick={applyCoupon}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Apply Coupon
      </button>
    </div>
    <button
      onClick={handleBooking}
      className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
    >
      Confirm & Pay ₹{price - discount + taxes}
    </button>
  </div>
</div>

        </div>
    );
};

export default BookingPage;
