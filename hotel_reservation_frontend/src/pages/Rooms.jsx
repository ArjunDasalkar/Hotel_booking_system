import React from "react";
import "./Rooms.css"; // Ensure this CSS file exists

const rooms = [
  { name: "Single Room", price: "$100", description: "A cozy room for one person." },
  { name: "Double Room", price: "$150", description: "Spacious room for two guests." },
  { name: "Suite", price: "$200", description: "Luxury suite with premium amenities." },
];

const Rooms = () => {
  return (
    <div className="rooms-container">
      <h2 className="section-title">Available Rooms</h2>
      <div className="rooms-grid">
        {rooms.map((room, index) => (
          <div key={index} className="room-card">
            <h3>{room.name}</h3>
            <p className="room-price">{room.price} / night</p>
            <p className="room-description">{room.description}</p>
            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
