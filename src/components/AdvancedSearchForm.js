import React, { useState } from 'react';

const AdvancedSearchForm = ({ onAdvancedSearch }) => {
  const [searchTerm] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [availabilityType, setAvailabilityType] = useState('');

  const handleSearch = () => {
    // Validate the price range
    const minPriceValue = parseFloat(minPrice);
    const maxPriceValue = parseFloat(maxPrice);

    if (isNaN(minPriceValue) || isNaN(maxPriceValue) || minPriceValue < 0 || maxPriceValue <= minPriceValue) {
      alert('Invalid price range');
      return;
    }

    // Validate the date range
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert('Invalid date range');
      return;
    }

    // Convert minPrice and maxPrice to numbers before passing to onAdvancedSearch
    onAdvancedSearch({
      searchTerm,
      type,
      minPrice: minPriceValue,
      maxPrice: maxPriceValue,
      brand,
      startDate,
      endDate,
      location,
      availabilityType,
    });
  };

  return (
    <form className="advanced-search">
  <div className="form-group">
    <label htmlFor="type" className="label">
      Type:
    </label>
    <input
      type="text"
      id="type"
      placeholder="e.g. House"
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="input-group"
    />
  </div>
  <div className="form-group price-range">
    <label htmlFor="minPrice" className="label">
      Price Range:
    </label>
    <input
      type="number"
      id="minPrice"
      placeholder="Min Price"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
      className="input-group"
    />
    <span className="separator">-</span>
    <input
      type="number"
      id="maxPrice"
      placeholder="Max Price"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
      className="input-group"
    />
  </div>
  <div className="form-group">
    <label htmlFor="bedrooms" className="label">
      Bedrooms:
    </label>
    <input
      type="text"
      id="bedrooms"
      placeholder="e.g. 2"
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
      className="input-group"
    />
  </div>
  <div className="form-group date-range">
    <label htmlFor="startDate" className="label">
      Date Range:
    </label>
    <input
      type="date"
      id="startDate"
      placeholder="Start Date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="input-group"
    />
    <span className="separator">-</span>
    <input
      type="date"
      id="endDate"
      placeholder="End Date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="input-group"
    />
  </div>
  <div className="form-group">
    <label htmlFor="location" className="label">
      Location:
    </label>
    <input
      type="text"
      id="location"
      placeholder="e.g. London"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="input-group"
    />
  </div>
  <div className="form-group">
    <label htmlFor="availability" className="label">
      Availability:
    </label>
    <select
      id="availability"
      value={availabilityType}
      onChange={(e) => setAvailabilityType(e.target.value)}
      className="input-group"
    >
      <option value="">All</option>
      <option value="For Sale">For Sale</option>
      <option value="For Rent">For Rent</option>
    </select>
  </div>
  <button type="button" onClick={handleSearch} className="input-group">
    Search
  </button>
</form>

  );
};

export default AdvancedSearchForm;
