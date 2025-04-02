import React, { useState } from "react";

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState("UPI");
    const totalAmount = 3527; // Sample amount, can be passed as a prop
    const hotelDetails = {
        name: "Ginger Goa, Panjim",
        checkIn: "Mon, 3 Mar'25",
        checkOut: "Tue, 4 Mar'25",
        roomType: "1x Luxe Single Room",
        guestInfo: "1 Room | 1 Adult | 1 Night",
        email: "nandinigupta9934@gmail.com",
        mobile: "+91-7080304155",
    };

    return (
        <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
            {/* Left Section - Hotel Details and Payment Options */}
            <div className="md:w-2/3 space-y-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex items-center">
                        <img src="/hotel-placeholder.png" alt="Hotel" className="w-16 h-16 rounded-md" />
                        <div className="ml-4">
                            <h1 className="text-xl font-bold">{hotelDetails.name}</h1>
                            <p className="text-gray-500">{hotelDetails.guestInfo}</p>
                        </div>
                    </div>
                    <div className="mt-4 border-t pt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Check-In</p>
                            <p className="text-gray-600">{hotelDetails.checkIn}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Check-Out</p>
                            <p className="text-gray-600">{hotelDetails.checkOut}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="font-semibold">Room Type</p>
                            <p className="text-gray-600">{hotelDetails.roomType}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="font-semibold">Booking Details Sent To</p>
                            <p className="text-gray-600">{hotelDetails.email}, {hotelDetails.mobile}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Options Section */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold">Select Payment Method</h1>
                    <div className="mt-4">
                        {[
                            { name: "UPI Options", desc: "Pay Directly From Your Bank Account" },
                            { name: "Credit & Debit Cards", desc: "Visa, Mastercard, Amex, Rupay and more" },
                            { name: "EMI", desc: "Credit/Debit Card EMI Available" },
                            { name: "Net Banking", desc: "40+ Banks Available" },
                            { name: "Book Now Pay Later", desc: "Lazypay, Simpl, HDFC, ICICI, IDFC" },
                            { name: "Gift Cards & e-wallets", desc: "MMT Gift Cards & Amazon Pay" },
                        ].map((option, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedPayment(option.name)}
                                className={`p-4 border rounded-lg cursor-pointer mt-2 ${
                                    selectedPayment === option.name ? "border-blue-500 bg-blue-100" : ""
                                }`}
                            >
                                <h2 className="font-semibold">{option.name}</h2>
                                <p className="text-gray-500 text-sm">{option.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section - Total Due & QR Payment */}
            <div className="md:w-1/3 space-y-6">
                {/* Total Due Card */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="font-semibold text-lg">Total Due</h2>
                    <div className="flex justify-between mt-2">
                        <p>Hotel Fare</p>
                        <p>₹3,149</p>
                    </div>
                    <div className="flex justify-between mt-2">
                        <p>Taxes</p>
                        <p>₹378</p>
                    </div>
                    <div className="flex justify-between mt-2 font-bold border-t pt-2">
                        <p>Total Amount</p>
                        <p>₹{totalAmount}</p>
                    </div>
                </div>

                {/* QR Code Payment */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="font-semibold text-lg">Scan to Pay</h2>
                    <p className="text-gray-600 text-sm mt-2">Instant Refund & High Success Rate</p>
                    <div className="mt-4">
                        <img src="/qr-code-placeholder.png" alt="QR Code" className="mx-auto w-32 h-32" />
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                            View QR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
