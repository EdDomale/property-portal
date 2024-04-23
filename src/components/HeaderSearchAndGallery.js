import React, { useState, useEffect, useRef } from 'react';
import ImageCard from './ImageCard';
import SearchBar from './SearchBar';
import AdvancedSearchForm from './AdvancedSearchForm';
import ProductDetails from './ProductDetails';

const HeaderSearchAndGallery = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const availableSectionRef = useRef(null);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);

  const handleImageCardClick = (product) => {
    // Set the selected product to display its details
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeProductDetails = () => {
    // Close the detailed view by resetting the selected product
    setSelectedProduct(null);
    setIsProductDetailsOpen(false);
    document.body.classList.remove('modal-open');
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/properties.json');
      const data = await response.json();
      setOriginalProducts(data.properties);
      setFilteredProducts(data.properties);
    };
  
    fetchData();
  }, []); // Empty dependency array to run only once on mount









  const addToFavorites = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    } else {
      alert('This item is already in favorites!');
    }
  };

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
    setFavorites(updatedFavorites);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const productId = event.dataTransfer.getData('text/plain');
    const product = originalProducts.find((p) => p.id.toString() === productId);

    addToFavorites(product);
  };
  
  const handleFavoriteDrop = (event) => {
    event.preventDefault();
    const productId = event.dataTransfer.getData('text/plain');

    removeFromFavorites(productId);
  };



  const handleDragStart = (event, product) => {
    event.dataTransfer.setData('text/plain', product.id);
  };

 

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSimpleSearch = (searchTerm, availabilityType) => {
    const searchTermLowerCase = searchTerm.toLowerCase();

    const availability = availabilityType === 'For Sale' ? 'Purchase' : 'Rent';

    const filtered = originalProducts.filter((properties) => {
      const searchTermMatch =
        searchTermLowerCase === '' ||
        properties.type.toLowerCase().includes(searchTermLowerCase) ||
        properties.location.address.toLowerCase().includes(searchTermLowerCase);

      const availabilityMatch = !availability || properties.availability === availability;

      return searchTermMatch && availabilityMatch;
    });

    setFilteredProducts(filtered);
  };






  const handleAdvancedSearch = (searchCriteria) => {
    // Destructuring searchCriteria object
    const {
      searchTerm,
      type,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      location,
      availabilityType,
    } = searchCriteria;

    // Update filteredProducts accordingly
    const filtered = originalProducts.filter((properties) => {
      // Apply individual filters based on search criteria
      const searchTermMatch =
        searchTerm === '' ||
        properties.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        properties.location.address.toLowerCase().includes(searchTerm.toLowerCase());

      const typeMatch = !type || properties.type.toLowerCase() === type.toLowerCase();

      const priceMatch =
        (isNaN(minPrice) || properties.price >= parseFloat(minPrice)) &&
        (isNaN(maxPrice) || properties.price <= parseFloat(maxPrice));

      const addressMatch = !location.address || properties.location.address.toLowerCase().includes(location.address.toLowerCase());

      const dateMatch =
        (!startDate ||
          new Date(
            properties.added.year,
            monthToNumber(properties.added.month) - 1,
            properties.added.day
          ) >= new Date(startDate + 'T00:00:00')) &&
        (!endDate ||
          new Date(
            properties.added.year,
            monthToNumber(properties.added.month) - 1,
            properties.added.day
          ) <= new Date(endDate + 'T23:59:59'));

      const locationMatch =
        !location.address || properties.location.address.toLowerCase().includes(location.address.toLowerCase());

      const availability = availabilityType
        ? availabilityType === 'For Sale'
          ? 'Purchase'
          : 'Rent'
        : 'All';

      const availabilityMatch = availability === 'All' || properties.availability === availability;

      // Combine all filters with AND condition
      const isMatch =
        searchTermMatch &&
        typeMatch &&
        priceMatch &&
        addressMatch &&
        dateMatch &&
        locationMatch &&
        availabilityMatch;

      return isMatch;
    });


    // Update state with filtered products
    setFilteredProducts(filtered);

    // Scroll to the "Available" section
    availableSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  // Helper function to convert month name to number (e.g., "January" to 1)
  const monthToNumber = (month) => {
    const months = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    return months[month];
  };

  const handleButtonClick = (availabilityType) => {
    const filtered = originalProducts.filter(
      (properties) => properties.availability === availabilityType
    );
    setFilteredProducts(filtered);
  };

  const handleLogoClick = () => {
    // Reset filtered products to the original list
    setFilteredProducts(originalProducts);
  };

  const handleToggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  return (
    <>
    <div onDrop={handleFavoriteDrop} onDragOver={handleDragOver}>
      <div className="logo" >
        <img src="./logo.png" alt="Logo" />
        <div onClick={handleLogoClick}>
          <h1>Believe in Finding it</h1>
          <h3>Search properties for sale and to rent in the UK</h3>
        </div>
        <SearchBar onSearch={handleSimpleSearch} onButtonClick={handleButtonClick} />
      </div>
      {/* Display detailed view when a product is selected */}
      {selectedProduct && (
        <ProductDetails isProductDetailsOpen={isProductDetailsOpen} product={selectedProduct} onClose={closeProductDetails} />
      )}
      <hr />
      <div className="advanced-anchor" >
        {/* Anchor to toggle Advanced Search */}
        <a href="#" onClick={handleToggleAdvancedSearch}>
          {showAdvancedSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
        </a>
      </div>


      

      {/* Advanced Search Form */}
      {showAdvancedSearch && <AdvancedSearchForm onAdvancedSearch={handleAdvancedSearch} />}
      <hr />
      </div>

      <div className="container">
        <div className="all-items" ref={availableSectionRef} onDrop={handleFavoriteDrop} onDragOver={handleDragOver}>
          <h2>Available</h2>
          <div className="gallery">
            {filteredProducts.map((properties) => (
              <div key={properties.id} draggable onDragStart={(e) => handleDragStart(e, properties)}>
                <ImageCard product={properties} addToFavorites={addToFavorites} onClick={handleImageCardClick}/>
              </div>
            ))}
          </div>
        </div>

        <div className="favorites" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className="favorite-icon">
        <h2>Favorites</h2>
          {favorites.length > 0 && (
          <div onClick={clearFavorites}>
          <h2 className="icon">Clear All 🗑️</h2>
        </div>
        )}
        </div>
        <div className="gallery">
          {favorites.map((fav) => (
            <div key={fav.id} draggable onDragStart={(e) => handleDragStart(e, fav)}>
              <ImageCard product={fav} removeFromFavorites={removeFromFavorites} onClick={handleImageCardClick}/>
            </div>
          ))}
        </div>
      </div>
      </div>
      
    </>
  );
};

export default HeaderSearchAndGallery;
