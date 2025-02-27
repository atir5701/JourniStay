import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const handleCancel = async (id) => {
    console.log(id);
    const resp = await axios.delete(
      "http://localhost:8000/deleteBooking/" + id
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [handleCancel]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <Link to={"/account/booking/"+booking._id}>
            <div
              key={booking._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Booking for {booking.name}
              </h3>
              <p className="text-gray-600">Email: {booking.email}</p>
              <p className="text-gray-600">Check-in: {booking.checkIn}</p>
              <p className="text-gray-600">Check-out: {booking.checkOut}</p>
              <Link
                to={`/place/${booking.place}`}
                className="text-blue-500 underline"
              >
                View Place
              </Link>
              <button
                className="mt-2 block w-full bg-red-500 text-white p-2 rounded-lg"
                onClick={() => handleCancel(booking._id)}
              >
                Cancel Booking
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
