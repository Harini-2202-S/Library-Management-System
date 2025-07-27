import React from "react";
import "./Footer.css"; // Importing the CSS file
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - About */}
        <div className="footer-section about">
          <h3>VLib Library</h3>
          <p>
            Your one-stop destination for books, research, and digital
            resources.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Catalog</a>
            </li>
            <li>
              <a href="#">My Borrowed Books</a>
            </li>
            <li>
              <a href="#">E-Library</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h3>Contact</h3>
          <p>
            Email:{" "}
            <a href="mailto:admin.chennai@vit.ac.in">admin.chennai@vit.ac.in</a>
          </p>
          <p>
            Phone: <a href="tel:+914439931555">+91 44 3993 1555</a>
          </p>
          <p>Vellore Institute of Technology University,</p>
          <p>Vandalur Kelambakkam Road,</p>
          <p>Keelakotaiyur, Chennai, Tamil Nadu – 600 127</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 VLib Library. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;