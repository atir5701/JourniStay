import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import { UserContext } from "../UserContext";
import { useNavigate} from "react-router-dom";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {user} = useContext(UserContext)

  useEffect(() => {  
    const storedUserData = localStorage.getItem("userData");
    const getData = async () => {
      try {
        const resp = await axios.get("/places/" + id);
        if (resp.data) {
          setPlace(resp.data);
        } else {
          setError("Place not found");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!place) {
    return <div>Place not found</div>;
  }

  if(!user){
    navigate("/login");
  }

  return (
    
    <div className="mt-8 px-6 py-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Title and Address */}
        <h1 className="text-3xl font-bold text-gray-800">{place.title}</h1>
        <a
          className="mt-2 block text-blue-600 hover:text-blue-800 font-semibold underline"
          target="_blank"
          href={"https://maps.google.com/?q=" + place.address}
        >
          📍{place.address}
        </a>

        {/* Image Grid */}
        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr] rounded-xl overflow-hidden">
          <div className="rounded-lg overflow-hidden">
            {place.photo?.[0] && (
              <img
                src={"http://localhost:8000" + place.photo[0]}
                alt="Place 1"
                className="w-full h-[350px] object-cover rounded-lg transition-transform transform hover:scale-105"
              />
            )}
          </div>
          <div className="grid gap-2">
            {place.photo?.[1] && (
              <img
                src={"http://localhost:8000" + place.photo[1]}
                alt="Place 2"
                className="w-full h-[170px] object-cover rounded-lg transition-transform transform hover:scale-105"
              />
            )}
            {place.photo?.[2] && (
              <img
                src={"http://localhost:8000" + place.photo[2]}
                alt="Place 3"
                className="w-full h-[170px] object-cover rounded-lg transition-transform transform hover:scale-105"
              />
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">Description</h2>
          <p className="text-gray-600 mt-2">{place.description}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Booking Information
            </h3>
            <div className="text-gray-700 mt-4 space-y-3">
              <label className="block">
                <b>Check-in Time:</b>
                <p className="mt-1 block w-full p-2 bg-white ">{place.checkIn}</p>
              </label>
              <label className="block">
                <b>Check-Out Time:</b>
                <p className="mt-1 block w-full p-2 bg-white ">{place.checkOut}</p>
              </label>
              <label className="block">
                <b>Maximum Number of Guests:</b>
                <p className="mt-1 block w-full p-2 bg-white">{place.maxGuest}</p>
              </label>
            </div>
          </div>
          <BookingWidget></BookingWidget>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
