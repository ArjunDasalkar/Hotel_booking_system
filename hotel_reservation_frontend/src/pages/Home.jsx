// Home.jsx
import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Hotel Booking System</h1>
      <p>Book your stay with us today!</p>
      <div>
        <Link to="/rooms">
          <button>View Rooms</button>
        </Link>
        <Link to="/booking">
          <button>Book Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
