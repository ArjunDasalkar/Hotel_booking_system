import React, { useState } from "react";
import "./Rooms.css";

const handleConfirmBooking = async () => {
  if (!customerInfo.idNumber || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
    alert("Please fill in all details.");
    return;
  }

  const bookingDetails = {
    name: customerInfo.name,
    email: customerInfo.email,
    phone: customerInfo.phone,
    room_number: selectedRoom.room_number,  // Correct property to match backend
  };

  try {
    const response = await fetch("http://localhost:5000/book-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingDetails),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Booking successful! ✅");
      setIsBooked(true); // Show success message in UI
      window.location.reload(); // Refresh to update room availability
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Error booking room:", error);
    alert("Something went wrong.");
  }
};


const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    idNumber: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isBooked, setIsBooked] = useState(false);

  const rooms = [
    { id: 101, room_number: "101", type: "Deluxe", price: 3500, status: "available" },
    { id: 102, room_number: "102", type: "Standard", price: 2500, status: "booked" },
    { id: 103, room_number: "103", type: "Suite", price: 5000, status: "available" },
  ];

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setIsBooked(false);
  };

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleConfirmBooking = () => {
    if (customerInfo.idNumber && customerInfo.name && customerInfo.email && customerInfo.phone) {
      setIsBooked(true);
    } else {
      alert("Please fill in all details.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Hotel Booking System</h1>
        <nav className="app-nav">
          <a  href="#">Home</a>
          <a href="#">Rooms</a>
          <a href="#">Booking</a>
          <a href="#">Admin</a>
        </nav>
      </header>

      <div className="rooms-container">
        {/* Rooms Listing */}
        <div className="room-list">
          {rooms.map((room) => (
            <div key={room.id} className={`room-card ${room.status === "booked" ? "unavailable" : ""}`}>
              <h3>Room {room.room_number}</h3>
              <p>Type: {room.type}</p>
              <p>Price: ₹{room.price}</p>
              <button
                className="book-button"
                onClick={() => handleBookNow(room)}
                disabled={room.status === "booked"}
              >
                {room.status === "booked" ? "Unavailable" : "Book Now"}
              </button>
            </div>
          ))}
        </div>

        {/* Booking Details & Form */}
        {selectedRoom && (
          <div className="booking-sidebar">
            <div className="booking-details">
              <h3>Booking Details</h3>
              <div className="detail-item">
                <span className="detail-label">Room Number:</span>
                <span className="detail-value">{selectedRoom.room_number}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{selectedRoom.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Price:</span>
                <span className="detail-value">₹{selectedRoom.price}</span>
              </div>

              {!isBooked ? (
                <div className="customer-form">
                  <h3>Customer Details</h3>
                  <div className="form-group">
                    <label>ID Number:</label>
                    <input type="number" name="idNumber" placeholder="Enter ID" onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" name="name" placeholder="Enter Full Name" onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phone" placeholder="Enter Phone Number" onChange={handleChange} required />
                  </div>
                  <button className="confirm-button" onClick={handleConfirmBooking}>Confirm Booking</button>
                </div>
              ) : (
                <div className="booking-success">
                  <p className="thank-you-message">🎉 Thank you for booking, {customerInfo.name}!</p>
                  <p className="confirmation-details">Your booking for Room {selectedRoom.room_number} has been confirmed.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;