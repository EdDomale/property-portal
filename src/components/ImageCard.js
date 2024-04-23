import React from 'react';
import Button from './Button';

const ImageCard = ({ product, addToFavorites, removeFromFavorites, onClick }) => {
  const { id, type, bedrooms, location, added, images } = product;
  const firstImage = images[0];
  const imageName = firstImage.split('/').pop();

  const isFavorite = removeFromFavorites !== undefined;

  return (
    <div className="card-wrapper">
    <section className="card" onClick={() => onClick(product)}>
      <div className='image'>
        <img src={firstImage} alt={imageName} />
      </div>
      <div className="description">
        <h3>Type: {type}</h3>
        <h3>Bedrooms: {bedrooms}</h3>
        <h3>Location: {location.address}</h3>
        <h3>Added: {added.month} {added.day}, {added.year}</h3>
        </div>
    </section>
    
        {isFavorite ? (
          <Button onClick={() => removeFromFavorites(id)} label="Remove from Favorites" />
        ) : (
          <Button onClick={() => addToFavorites(product)} label="Add to Favorites" />
        )}
    </div>
  );
};

export default ImageCard;
