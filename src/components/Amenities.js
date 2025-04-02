import React from 'react';
import { Wifi, Star, Utensils, Sparkles } from 'lucide-react';

export function Amenities() {
  return (
    <div className="md:col-span-2">
      <div className="flex gap-4 mb-6">
        <div className="bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span>Pay @ Hotel</span>
        </div>
        <div className="bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span>Free WiFi</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        <AmenityItem icon={<Wifi className="w-6 h-6" />} label="High Speed Wifi" />
        <AmenityItem icon={<Star className="w-6 h-6" />} label="Well-equipped Rooms" />
        <AmenityItem icon={<Utensils className="w-6 h-6" />} label="Healthy Food" />
        <AmenityItem icon={<Sparkles className="w-6 h-6" />} label="100% Hygiene" />
      </div>
    </div>
  );
}

function AmenityItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-gray-700">{icon}</div>
      <span className="text-sm text-center">{label}</span>
    </div>
  );
}
