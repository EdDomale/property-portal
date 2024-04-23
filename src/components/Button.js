import React from 'react';

const Button = ({ label, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onClick();
  };

  return (
    <button className="card-button" type="button" onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
