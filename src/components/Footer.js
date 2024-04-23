import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: ABC@gmail.com</p>
          <p>Phone: +1 123-456-7890</p>
        </div>

        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>

        <div className="footer-section">
          <h2>Links</h2>
          <p>Home</p>
          <p>Products</p>
          <p>About Us</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
