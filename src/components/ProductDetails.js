import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

const ProductDetails = ({ product, onClose, isProductDetailsOpen }) => {
  const { id, images, type, bedrooms, price, description, location, availability, added } = product;
  const [availableImages, setAvailableImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const imageStatuses = await Promise.all(images.map(image => checkImageExists(image)));
      setAvailableImages(images.filter((_, index) => imageStatuses[index]));
    };

    loadImages();
  }, [images]);

  const checkImageExists = (imageName) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = `/${imageName}`;
    });
  };

  useEffect(() => {
    // Reset current image index when availableImages changes
    setCurrentImageIndex(0);
  }, [availableImages]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : availableImages.length - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < availableImages.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div>
      {/* Backdrop for the blurred background */}
      {isProductDetailsOpen && <div className="backdrop"></div>}

      {/* Product details */}
      <div id={`details-${id}`} className={`product-details ${isProductDetailsOpen ? 'modal-open' : ''}`}>
        
      <button className='close-button' onClick={onClose}>
        [x]
      </button>
        <hr />
        {/* Photo Carousel */}
        <div className="photo-carousel">
          {availableImages.length > 0 && (
            <>
              <button onClick={handlePrevClick}>&lt;</button>
              {availableImages.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`}
                  alt={`Product ${id} - ${index + 1}`}
                  style={{
                    display: index === currentImageIndex ? 'block' : 'none',
                    width: '100%'
                  }}
                />
              ))}
              <button onClick={handleNextClick}>&gt;</button>
            </>
          )}
        </div>
      {/* Additional Product Details */}
      <div className="additional-details">
        <h2>{type} - {bedrooms} Bedrooms</h2>
        <p><strong>Availability:</strong> {availability}</p>
        <p><strong>Added:</strong> {added.month} {added.day}, {added.year}</p>
        <p><strong>Property Type:</strong> {type}</p>
        <p><strong>Bedrooms:</strong> {bedrooms}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Location:</strong> {location.name}</p>

        {/* Map */}
        <div className="map">
          {/* Display the location on a map or use a map component */}
          <MapComponent location={location} />
        </div>
      </div>
      <button onClick={onClose}>
        Close
      </button>
    </div>
    </div>
  );
};

export default ProductDetails;
