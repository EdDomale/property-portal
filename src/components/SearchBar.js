import React, { useState } from 'react';
import Button from './Button';

const SearchBar = ({ onSearch, onButtonClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = (availabilityType) => {
    onSearch(searchTerm, availabilityType);
  };

  return (
    <section className="search-container">
      <form>
        <label htmlFor="term">Search Property or Location </label>
        <br />
        <input type="text" id="term" name="term" onChange={handleInputChange} />
        <br />
        <Button label="For Sale" onClick={() => handleButtonClick('For Sale')} />
        <Button label="For Rent" onClick={() => handleButtonClick('For Rent')} />
      </form>
    </section>
  );
};

export default SearchBar;
