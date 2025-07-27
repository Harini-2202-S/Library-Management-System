import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">V-LIB</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/elibrary">E-Library</Link>
        <Link to="/wishlist">Wish List</Link>
        <Link to="/events">Events</Link>
        <Link to="/help">Help</Link>
      </div>
    </nav>
  );
};

export default Header;
