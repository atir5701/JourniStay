import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (ev) => {
    ev.preventDefault(); // Prevent default form submission

    const data = { name:name, email:email, password:password };

    try {
      const res = await axios.post(
        "http://localhost:8000/register",
        data,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if(res.data.message){
        return alert(res.data.message)
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="primary">
            Register
          </button>
        </form>
        <div className="text-center py-2 text-gray-500">
          Already a member ?
          <Link to={"/login"} className="underline text-black">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
