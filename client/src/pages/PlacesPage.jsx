import React, { useState, useContext, useEffect } from "react";
import PlacesFormPage from "./PlacesFormPage";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/places");
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const { action } = useParams();
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-red-500 py-2 px-6 text-white mt-4 rounded-full"
            to={"/account/listings/new"}
          >
            {" "}
            + Add Places
          </Link>
          <div className="mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  key={place._id}
                  className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="w-full h-48 bg-gray-300 flex-shrink-0 rounded-lg overflow-hidden">
                    {place.photo ? (
                      <img
                        src={"http://localhost:8000" + place.photo[0]}
                        alt={place.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-semibold">
                        Image Unavailable
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {place.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                      {place.address}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {place.description}
                    </p>
                    <div className="mt-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
      {action === "new" && <PlacesFormPage></PlacesFormPage>}
    </div>
  );
};

export default PlacesPage;
