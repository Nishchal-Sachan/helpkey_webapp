import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMakePayment } from './razorpay/buyProduct.js';

const BookingPage = () => {
    const makePayment = useMakePayment();
    const [searchParams] = useSearchParams();
    const propertyid = searchParams.get('propertyid');
    const checkInDate = searchParams.get('checkin');
    const checkOutDate = searchParams.get('checkout');
    const guests = parseInt(searchParams.get('guests')) || 1;
    const roomCount = parseInt(searchParams.get('rooms')) || 1;
    const basePrice = parseFloat(searchParams.get('price')) || 4299;

    const [hotel, setHotel] = useState(null);
    const [secureTrip, setSecureTrip] = useState(null);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState(basePrice);
    const [taxes, setTaxes] = useState(464);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [guestDetails, setGuestDetails] = useState([]);
    const [mealOption, setMealOption] = useState(null);

    const baseUrl="https://helpkey-backend.onrender.com/api"
    useEffect(() => {
        const guestArray = [];
        for (let i = 0; i < guests; i++) {
            guestArray.push({
                title: "Mr",
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
            });
        }
        setGuestDetails(guestArray);

        if (propertyid) {
            setLoading(true);
            setError(null);

            axios
                .get(`${baseUrl}/listings/${propertyid}`)
                .then((response) => {
                    setHotel(response.data.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Failed to load hotel details.');
                    setLoading(false);
                });
        }
    }, [propertyid, guests]);

    const handleBooking = async () => {
        try {
            // Commenting out the payment logic for testing the booking functionality
            // const paymentHandler = async (paymentDetails) => {
            //     try {
            //         const bookingData = {
            //             hotel_id: propertyid,
            //             guest_name: guestDetails[0].firstName + " " + guestDetails[0].lastName,
            //             check_in: checkInDate,
            //             check_out: checkOutDate,
            //             total_price: price - discount + taxes,
            //             payment_id: paymentDetails.razorpay_payment_id,
            //         };
            //         const response = await axios.post("https://helpkey-backend.onrender.com/api/bookings", bookingData);
    
            //         if (response.data.success) {
            //             alert("Booking successful!");
            //             navigate(`/success?bookingid=${response.data.bookingId}`);
            //         } else {
            //             alert("Booking failed! Please try again.");
            //         }
            //     } catch (error) {
            //         console.error("Booking error after payment:", error);
            //         alert("An error occurred while saving the booking.");
            //     }
            // };
    
            // Directly call the booking API without payment handling
            // console.log("guestDetails",guestDetails);
            const bookingData = {
                hotel_id: Number(propertyid),
                guest_name: guestDetails[0].firstName + " " + guestDetails[0].lastName,
                guest_email: guestDetails[0].email,
                check_in: checkInDate,
                check_out: checkOutDate,
                total_price: price - discount + taxes,
                payment_id: "razorpay_12345", // Payment is skipped for now
              };
              
            console.log("bookingData",bookingData);
            const response = await axios.post(
                `${baseUrl}/bookings`,
                bookingData,
                {
                  withCredentials: true, // Enable sending cookies (like JWT in HTTP-only cookie)
                }
              );
              
            if (response.data.success) {
                alert("Booking successful!");
                navigate(`/success?bookingid=${response.data.bookingId}`);
            } else {
                alert("Booking failed! Please try again.");
            }
        } catch (error) {
            console.error("Error during booking:", error);
            alert("An error occurred while saving the booking.");
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

    const handleMealSelection = (option) => {
        setMealOption(option);
        let newPrice = basePrice;
        if (option === "breakfast") {
            newPrice += 303;
        } else if (option === "lunchDinner") {
            newPrice += 530;
        }
        setPrice(newPrice);
    };

    const clearMealSelection = () => {
        setMealOption(null);
        setPrice(basePrice);
    };

    return (
        <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3 space-y-6">
                <div className="bg-white shadow-odd rounded-lg p-6">
                    <h1 className="text-2xl font-bold">Review Your Booking</h1>
                    <p className="text-gray-600">{loading ? "Loading..." : hotel?.servicename || "Hotel Name Not Available"}</p>

                    <div className="flex justify-between items-center border-t pt-4 mt-4">
                        <div>
                            <p className="font-semibold">{roomCount} × Luxe Twin Room</p>
                            <p className="text-gray-500">{checkInDate} | {checkOutDate} | {guests} Guests</p>
                        </div>
                        <p className="text-xl font-semibold">₹{price}</p>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <h2 className="font-semibold text-lg">Upgrade Your Stay</h2>
                        <div className="flex flex-col gap-2 mt-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="meal"
                                    className="accent-blue-500"
                                    checked={mealOption === "breakfast"}
                                    onChange={() => handleMealSelection("breakfast")}
                                />
                                <span>Add Breakfast for ₹303</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="meal"
                                    className="accent-blue-500"
                                    checked={mealOption === "lunchDinner"}
                                    onChange={() => handleMealSelection("lunchDinner")}
                                />
                                <span>Add Breakfast + Lunch/Dinner for ₹530</span>
                            </label>
                        </div>

                        {mealOption && (
                            <button
                                onClick={clearMealSelection}
                                className="mt-2 text-red-500 font-semibold"
                            >
                                Clear Selection
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white shadow-odd rounded-lg p-6">
                    <h2 className="text-xl font-bold">Guest Details</h2>

                    <div className="mt-4">
                        <label className="p-2">
                            <input type="radio" name="guestdetail" onChange={() => setSecureTrip(true)} /> Myself
                        </label>
                        <label className="p-2">
                            <input type="radio" name="guestdetail" onChange={() => setSecureTrip(false)} /> My guests
                        </label>
                    </div>
                    <div className="guest-detail-container mt-4">
                        {guestDetails.map((guest, index) => (
                            <div key={index} className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={guest.firstName}
                                    onChange={(e) => handleGuestChange(index, "firstName", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={guest.lastName}
                                    onChange={(e) => handleGuestChange(index, "lastName", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={guest.email}
                                    onChange={(e) => handleGuestChange(index, "email", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                <input
                                    type="tel"
                                    placeholder="Mobile"
                                    value={guest.mobile}
                                    onChange={(e) => handleGuestChange(index, "mobile", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                {guestDetails.length > 1 && (
                                    <button
                                        onClick={() => removeGuest(index)}
                                        className="mt-2 text-red-500 font-semibold"
                                    >
                                        Remove Guest
                                    </button>
                                )}
                            </div>
                        ))}
                        <button onClick={addGuest} className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
                            Add Guest
                        </button>
                    </div>
                </div>
            </div>

            <div className="md:w-1/3 bg-white shadow-odd rounded-lg p-6">
                <h2 className="text-xl font-bold">Price Details</h2>
                <div className="flex justify-between mt-2">
                    <span>Base Price</span>
                    <span>₹{basePrice}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Taxes</span>
                    <span>₹{taxes}</span>
                </div>
                <div className="flex justify-between mt-2 font-bold">
                    <span>Total</span>
                    <span>₹{price - discount + taxes}</span>
                </div>

                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    <button
                        onClick={applyCoupon}
                        className="w-full mt-2 bg-green-600 text-white py-2 rounded"
                    >
                        Apply Coupon
                    </button>
                </div>

                <button
                    onClick={handleBooking}
                    className="w-full mt-6 bg-blue-600 text-white py-2 rounded"
                >
                    Confirm & Pay
                </button>
            </div>
        </div>
    );
};

export default BookingPage;
