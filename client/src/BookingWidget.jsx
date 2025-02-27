import axios from "axios";
import React, { useState } from "react";
import {useParams,useNavigate} from "react-router-dom"

const BookingWidget = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const { id } = useParams();
  const navigate = useNavigate()
  
  const handleBooking = async (e) => {
    e.preventDefault()
    nam
    const data = {
      checkIn,checkOut,name,email,place:id
    }
    const  resp = await axios.post("http://localhost:8000/booking",
      data
    )
    const d = resp.data
    alert("Booking done successfully")
    navigate("/account/bookings")
  };

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
          <b>Your Name</b>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          <b>Your Email Name</b>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </p>
      <button className="primary mt-4" onClick={handleBooking}>
        Book Here
      </button>
    </div>
  );
};

export default BookingWidget;
