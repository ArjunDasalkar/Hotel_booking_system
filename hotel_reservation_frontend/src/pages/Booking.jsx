import React from "react";
import * as BookingForm from "../components/BookingForm"; 

const Booking = () => {
  return (
    <div>
      <BookingForm.default /> {/* Accessing default export */}
    </div>
  );
};

export default Booking;