import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const resp = await axios.get("http://localhost:8000/allPlaces");
      const data = resp.data;
      setPlaces(data);
    };
    getData();
  }, []);
  return (
    <>
      <h2 className="text-2xl font-semibold text-center mt-10 mb-6">
        Welcome to AirBnB - Find the Perfect Home for Your Stay
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/place/'+place._id}>
              <div
                key={place._id}
                className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
                  <p className="text-sm text-gray-500 mt-2">{place.address}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {place.description}
                  </p>
                  <div className="mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default IndexPage;
