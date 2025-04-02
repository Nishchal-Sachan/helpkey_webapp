import React from 'react';
import { Calendar } from 'lucide-react';

export function BookingCard() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Fabulous</h3>
        <div className="text-green-600 text-sm">
          <div>92% guests rated 4+</div>
          <div>99% guests recommend</div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <DateDisplay date="03 Jan 2025" day="Friday" />
        <DateDisplay date="04 Jan 2025" day="Saturday" />
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <div>1 × Deluxe Room for 1 Guest</div>
          <div className="text-xl font-semibold">₹2,400</div>
        </div>
        <button className="w-full bg-yellow-400 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
}

function DateDisplay({ date, day }) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>{date}</span>
      </div>
      <div className="text-sm text-gray-500">{day}</div>
    </div>
  );
}
