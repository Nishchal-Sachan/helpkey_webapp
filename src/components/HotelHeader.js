import React from 'react';

export function HotelHeader() {
  return (
    <div className="container mx-auto px-4 py-2 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">FabHotel Prime The King's Court With Pool and Bar</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-600">Calangute, Goa</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">Couple Friendly</span>
        </div>
      </div>
      <div className="text-right">
        <div className="bg-blue-900 text-white px-3 py-1 rounded-lg text-xl">4.5</div>
        <div className="text-blue-600 mt-1">2104 Reviews</div>
      </div>
    </div>
  );
}
