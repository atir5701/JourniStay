import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import BookingsPage from './BookingsPage'

const AccountPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { subpage } = useParams();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData); // Parse stored data
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }

    setLoading(false); // Data has been fetched
  }, [navigate, setUser]);

  const handleLogout = async () => {
    await axios.post("http://localhost:8000/logout");
    setUser(null);
    localStorage.removeItem("userData");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center text-red-500">Redirecting to login...</p>;
  }

  return (
    <div>
      <AccountNav />
      <br />
      <br />

      {subpage === "profile" && (
        <div className="text-center p-6 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome, {user.name || "Guest"}
          </h2>
          <p className="text-gray-600 mb-6">
            You're logged in as <span className="font-bold">{user.email || "N/A"}</span>
          </p>

          <div className="space-x-4 mt-6">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {subpage==="bookings" && <BookingsPage/>}
      {subpage === "listings" && <Places Page />}
    </div>
  );
};

export default AccountPage;
