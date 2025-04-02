import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [price, setPrice] = useState(5000); // Default price range
  const [brands, setBrands] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [occupancy, setOccupancy] = useState([]);

  const handleCheckboxChange = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
    onFilterChange({ price, brands, policies, occupancy });
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h2 className="font-bold text-lg mb-4">Price Per Night</h2>
      <input
        type="range"
        min="500"
        max="10000"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
          onFilterChange({ price: e.target.value, brands, policies, occupancy });
        }}
        className="w-full"
      />
      <p className="text-gray-600">₹{price}</p>

      <h2 className="font-bold text-lg mt-6">Our Brands</h2>
      <div className="flex flex-col space-y-2 mt-2">
        {['HelpkeyExpress', 'Helpkey', 'Helpkey Prime', 'HelpkeyEscape'].map((brand) => (
          <label key={brand} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={brands.includes(brand)}
              onChange={() => handleCheckboxChange(brand, brands, setBrands)}
            />
            {brand}
          </label>
        ))}
      </div>

      <h2 className="font-bold text-lg mt-6">Guest Policy</h2>
      <div className="flex flex-col space-y-2 mt-2">
        {['Couple Friendly'].map((policy) => (
          <label key={policy} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={policies.includes(policy)}
              onChange={() => handleCheckboxChange(policy, policies, setPolicies)}
            />
            {policy}
          </label>
        ))}
      </div>

      <h2 className="font-bold text-lg mt-6">Occupancy</h2>
      <div className="flex flex-col space-y-2 mt-2">
        {['Triple', 'Double', 'Single'].map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={occupancy.includes(option)}
              onChange={() => handleCheckboxChange(option, occupancy, setOccupancy)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
