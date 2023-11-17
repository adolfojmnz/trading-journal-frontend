import React, { useState } from 'react';
import { APILoginRequest } from '@/app/api/auth';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await APILoginRequest(username, password);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("username", username);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        window.location.href = '/';
      } else {
        raise;
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="heading">Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}