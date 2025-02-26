import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:8000/login', {email,password},{ withCredentials: true });
      setUser(data);
      localStorage.setItem("userData",JSON.stringify(data))
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  }
 

  if (redirect) {
    return <Navigate to="/" />; 
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="your@gmail.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-2 mt-4 bg-red-500 text-white font-semibold rounded-full"
          >
            Login
          </button>
        </form>
        
        <div className="text-center py-2 text-gray-500">
          Don't have an account? 
          <Link to="/register" className="underline text-black">Register Here</Link>
        </div>
      </div>
    </div>
  );
  
};

export default LoginPage;