import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import { UserContext } from "../UserContext";
import AccountNav from "../AccountNav";

const PlacesFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [addedPhoto, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setGuest] = useState(1);

  const { user } = useContext(UserContext);

  const addNewPlace = async (ev) => {
    ev.preventDefault();
    if (!id) {
      const resp = await axios.post("http://localhost:8000/newPlace", {
        owner: user._id,
        title: title,
        address: address,
        description: description,
        checkIn: checkIn,
        checkOut: checkOut,
        photo: addedPhoto,
        maxGuest: Number(maxGuest),
      });
      alert("Places Added Successfully");
      return navigate("/account");
    }else{
      const resp = await axios.put("http://localhost:8000/updatPlace/"+id,{
        owner: user._id,
        title: title,
        address: address,
        description: description,
        checkIn: checkIn,
        checkOut: checkOut,
        photo: addedPhoto,
        maxGuest: Number(maxGuest),
      })
      alert("Place Updated Successfully")
      return navigate("/account/listings")
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      const resp = await axios.get("/places/" + id);
      const data = resp.data;
      setTitle(data.title);
      setAddress(data.address);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setDescription(data.description);
      setGuest(data.maxGuest);
      setAddedPhotos(data.photo);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="text-center">
        <form onSubmit={addNewPlace}>
          <div>
            <h2 className="text-2xl mt-4">Title</h2>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <h2 className="text-2xl mt-4">Address</h2>
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
            <h2 className="text-2xl mt-4">Photos</h2>
            <PhotosUploader
              addedPhoto={addedPhoto}
              addPhoto={setAddedPhotos}
              photoLink={photoLink}
              addPhotoLink={setPhotoLink}
            ></PhotosUploader>
            <h2 className="text-xl mt-4">Description</h2>
            <textarea
              className="w-full border my-1 py-2 px-3 rounded-2xl"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <h2 className="text-2xl mt-4">Check in & out Time, max guests</h2>
          <div className="grd gap-2 sm:grid-cols-3">
            <div>
              <h3 className="mt-2 -mb-1">Check in time </h3>
              <input
                type="text"
                placeholder="16:00"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <h3>Check Out time </h3>
              <input
                type="text"
                placeholder="8:00"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <h3>Max number of guests</h3>
              <input
                type="text"
                value={maxGuest}
                onChange={(e) => setGuest(e.target.value)}
              />
            </div>
          </div>
          <button className="mt-3 bg-red-500 p-2 w-full text-white rounded-2xl">
            Save the place
          </button>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
