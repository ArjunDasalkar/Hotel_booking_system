import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const token = localStorage.getItem("token"); // Check if admin is logged in

  return (
    <header className="header">
      <h1>Hotel Booking System</h1>
      <nav class="nav">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        {/* <Link to="/booking">Booking</Link> */}
        {!token && <Link to="/admin">Admin</Link>} {/* Hide if logged in */}
      </nav>
    </header>
  );
};

export default Header;
