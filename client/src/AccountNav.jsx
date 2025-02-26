import React, { useCallback, useContext, useEffect } from "react";

import { Navigate, useNavigate, Link, useParams } from "react-router-dom";

const AccountNav = () => {
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link
          to={"/account/profile"}
          className="py-2 px-6 bg-red-500 rounded-full"
        >
          My Profile
        </Link>
        <Link
          to={"/account/bookings"}
          className="py-2 px-6 bg-red-500 rounded-full"
        >
          My bookings
        </Link>
        <Link
          to={"/account/listings"}
          className="py-2 px-6 bg-red-500 rounded-full"
        >
          My listings
        </Link>
      </nav>
    </div>
  );
};

export default AccountNav;
