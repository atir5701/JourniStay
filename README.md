# Home Booking Web Application

## Introduction

Welcome to **StayMate**, a web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to browse, book, and manage their home stays while traveling. This app allows users to find homes for their trips, manage bookings, and leave reviews for hosts and guests alike.

## Features

- **Browse Homes**: Search homes by location, price, and type.
- **Booking System**: Users can book available homes for specific dates.
- **User Profiles**: Users can create and manage their profiles with personal information.
- **Host Management**: Hosts can list their homes, update details, and manage booking requests.
- **Rating & Reviews**: Guests can leave reviews for homes and hosts.

## Technologies Used

- **MongoDB**: NoSQL database to store user, home, and booking information.
- **Express**: Backend framework to handle HTTP requests.
- **React**: Frontend library to build the user interface.
- **Node.js**: Server-side runtime environment for running JavaScript.
- **JWT Authentication**: Secure user login with JSON Web Tokens.

## Prerequisites

Before running the project locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or use a cloud service like MongoDB Atlas)

## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/staymate.git
    ```

2. Navigate to the project folder:
    ```bash
    cd staymate
    ```

3. Install dependencies for both backend and frontend:
    ```bash
    # Backend dependencies
    cd backend
    npm install

    # Frontend dependencies
    cd ../frontend
    npm install
    ```

4. Create a `.env` file in the `backend` folder and add the following environment variables:
    ```
    MONGO_URI=mongodb://localhost:27017/staymate
    JWT_SECRET=your_jwt_secret
    ```

5. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

6. Start the frontend development server:
    ```bash
    cd frontend
    npm start
    ```

The app should now be running on `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Usage

1. **Sign Up/Login**: Users can sign up for an account and log in to start browsing and booking homes.
2. **Search Homes**: Use filters to search for homes based on location, price range, and other preferences.
3. **Make a Booking**: Select available homes and book them for specific dates.
4. **Host Homes**: If you're a host, you can list new homes for rent and manage them.
5. **Rate Homes**: After staying in a home, guests can leave a rating and review.

## API Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Login an existing user.

### Homes

- **GET /api/homes**: Fetch all available homes.
- **GET /api/homes/:id**: Fetch a specific home by its ID.
- **POST /api/homes**: Add a new home (host only).
- **PUT /api/homes/:id**: Update an existing home (host only).

### Bookings

- **GET /api/bookings**: Fetch all bookings for a user.
- **POST /api/bookings**: Create a new booking.
- **PUT /api/bookings/:id**: Update an existing booking.
- **DELETE /api/bookings/:id**: Cancel a booking.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

---

If you have any questions, feel free to open an issue or reach out to the maintainer.
