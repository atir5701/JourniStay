import React, { useState } from "react";
import axios from "axios";
const PhotosUploader = ({ addedPhoto, addPhoto, photoLink, addPhotoLink }) => {
  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data } = await axios.post("http://localhost:8000/uploadlink", {
      link: photoLink,
    });
    addPhoto((prev) => {
      return [...prev, data.data];
    });
    addPhotoLink("");
  };

  const uploadPhoto = async (ev) => {
    ev.preventDefault();
    const files = ev.target.files;
    const formData = new FormData();
    formData.append("photos", files[0]);
    const { data } = await axios.post(
      "http://localhost:8000/uploadPhoto",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    addPhoto((prev) => {
      const updated = [...prev, data.filePath];
      return updated;
    });
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add Using link"
          value={photoLink}
          onChange={(e) => addPhotoLink(e.target.value)}
        ></input>
        <button
          className=" bg-gray-200 px-4 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add photo
        </button>
      </div>

      <div className="mt-2 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
        {addedPhoto.length > 0 &&
          addedPhoto.map((link) => {
            return (
              <div className="h-32 flex">
                <img
                  className="rounded-2xl object-cover w-full"
                  src={"http://localhost:8000" + link}
                  alt="Image Unavailable"
                />
              </div>
            );
          })}

        <label className="flex item-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input type="file" className="hidden" onChange={uploadPhoto} />
          Upload from device
        </label>
      </div>
    </div>
  );
};

export default PhotosUploader;
