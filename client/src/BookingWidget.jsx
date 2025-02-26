import React, { useState } from "react";

const BookingWidget = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setGuest] = useState(0);

  const handleBooking = ()=>{
      
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800">Booking Here</h3>
      <p className="text-gray-700 mt-4 space-y-3">
        <label className="block">
          <b>Check-in Date:</b>
          <input
            type="date"
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          <b>Check-out Date:</b>
          <input
            type="date"
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          <b>Number of Guest:</b>
          <input
            onChange={(e) => setGuest(e.target.value)}
            type="number" 
            className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </p>
      <button className="primary mt-4" onClick={handleBooking}>Book Here</button>
    </div>
  );
};

export default BookingWidget;
